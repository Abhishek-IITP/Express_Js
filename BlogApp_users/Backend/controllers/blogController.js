const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const { verifyJWT } = require("../Utils/generateTokens");

async function createBlogs(req, res) {
  try {
    if(!req.body.token){
      return res.status(200).json({
        message:'Please SignIn',
        success: false
      })

    }
    let isValid= await verifyJWT(req.body.token)
    if(!isValid){
      return res.status(200).json({
        message:'invalid token',
        success: false
      })

    }


    const { title, description, draft ,creator} = req.body;
    console.log(req.body);

    if (!title || !description) {
      return res.status(400).json({
        message: "Fill all the required fields",
      });
    }

    const findUser= await User.findById(creator)
    if(!findUser){
      return res.status(500).json({
        message:  'mai ni janta bhai tujhe...tu h kon',
        // success: false
      });
    }
    console.log(findUser)


    const blog = await Blog.create({ title, description, draft,creator });
    await User.findByIdAndUpdate(creator,{$push :{blogs: blog._id}})
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


  async function getBlogs(req,res) {
      try {
        // const blogs = await Blog.find({ draft: false }).populate("creator");
        const blogs = await Blog.find({ draft: false }).populate({
          path : 'creator',
          select : "name"
        });

        return res. status(200).json({ blogs });
      } catch (err) {
        return res
          .status(500)
          .json({
            message: "Error occurred while fetching blogs",
            error: err.message,
          });
      }
    }
    
  
  async function getBlogsById(req,res) {
    try {
      const {id}= req.params
      const blog = await Blog.findById({ draft: false });
      return res.status(200).json({ 
        message:'Blogs Fetched successfully',
        blog });
    } catch (err) {
      return res
        .status(500)
        .json({
          message: "Error occurred while fetching blogs",
          error: err.message,
        });
    }
  }
  async function updateBlogs(req,res) {
      const { id } = req.params;
      try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedBlog) {
          return res
            .status(404)
            .json({ message: "Blog not found", success: false });
        }
        return res
          .status(200)
          .json({ message: "Blog updated successfully", updatedBlog });
      } catch (err) {
        return res
          .status(500)
          .json({
            message: "Error occurred while updating blog",
            error: err.message,
          });
      }
    
    
  }
  async function deleteBlogs(req,res) {
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
        return res
          .status(500)
          .json({
            message: "Error occurred while deleting blog",
            error: err.message,
          });
      }
    
    
  }

  module.exports={createBlogs , getBlogs , getBlogsById , updateBlogs,deleteBlogs}