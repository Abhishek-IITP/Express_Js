const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");

async function createBlogs(req, res) {
  const creator = req.user;

  try {
    const { title, description, draft } = req.body;
    // console.log(req.body);

    if (!title || !description) {
      return res.status(400).json({
        message: "Fill all the required fields",
      });
    }

    const findUser = await User.findById(creator);
    if (!findUser) {
      return res.status(500).json({
        message: "mai ni janta bhai tujhe...tu h kon",
        success: false,
      });
    }
    // console.log(findUser)

    const blog = await Blog.create({ title, description, draft, creator });
    await User.findByIdAndUpdate(creator, { $push: { blogs: blog._id } });
    return res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while creating the blog",
      error: error.message,
    });
  }
}

async function getBlogs(req, res) {
  try {
    // const blogs = await Blog.find({ draft: false }).populate("creator");
    const blogs = await Blog.find({ draft: false }).populate({
      path: "creator",
      select: "name",
    });

    return res.status(200).json({ blogs });
  } catch (err) {
    return res.status(500).json({
      message: "Error occurred while fetching blogs",
      error: err.message,
    });
  }
}

async function getBlogsById(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findById({ draft: false });
    return res.status(200).json({
      message: "Blogs Fetched successfully",
      blog,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error occurred while fetching blogs",
      error: err.message,
    });
  }
}
async function updateBlogs(req, res) {
  try {
  const creator = req.user;
  const {title, description,draft}= req.body
  const blogId= req.params;
  const blog = await Blog.findById(blogId)
  const user = await  User.findById(creator).select("-password")

  // if (!(creator=== blog.creator)){
  //   return res.status(404).json({
  //     success:false,
  //     message:"you are not authorized for this action"
  //   })
  // }
    // const updatedBlog = await Blog.findByIdAndUpdate(blogId, {title,description,draft});
    if (!updatedBlog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Blog updated successfully", updatedBlog });
  } catch (err) {
    return res.status(500).json({
      message: "Error occurred while updating blog",
      error: err.message,
    });
  }
}
async function deleteBlogs(req, res) {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: "Error occurred while deleting blog",
      error: err.message,
    });
  }
}

module.exports = {
  createBlogs,
  getBlogs,
  getBlogsById,
  updateBlogs,
  deleteBlogs,
};
