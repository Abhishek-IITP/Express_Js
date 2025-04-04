const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

// Database connection
async function dbConnect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/BlogDb');
    console.log("DB connected successfully");
  } catch (error) {
    console.log(error);
  }
}

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', userSchema);

// User Routes
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email", success: false });
    }

    const newUser = await User.create({ name, email, password });
    return res.status(201).json({ message: "User created successfully", success: true, newUser });
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false, error: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users, success: true });
  } catch (err) {
    return res.status(500).json({ message: "Error occurred while fetching data", success: false });
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    return res.status(200).json({ user, success: true });
  } catch (err) {
    return res.status(500).json({ message: "Error occurred while fetching data", success: false });
  }
});

app.patch('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    return res.status(200).json({ message: "User updated successfully", success: true, updatedUser });
  } catch (err) {
    return res.status(500).json({ message: "Error occurred while updating data", success: false });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    return res.status(200).json({ message: "User deleted successfully", success: true });
  } catch (err) {
    return res.status(500).json({ message: "Error occurred while deleting data", success: false });
  }
});

// Blog Schema and Model
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  draft: { type: Boolean, default: true }
});

const Blog = mongoose.model('Blog', blogSchema);

// Blog Routes
app.post('/blogs', async (req, res) => {
  const { title, content, draft } = req.body;
  try {
    const newBlog = await Blog.create({ title, content, draft });
    return res.status(201).json({ message: "Blog created successfully", newBlog });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false });
    return res.status(200).json({ blogs });
  } catch (err) {
    return res.status(500).json({ message: "Error occurred while fetching blogs", error: err.message });
  }
});

app.get('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found", success: false });
    }
    return res.status(200).json({ blog });
  } catch (err) {
    return res.status(500).json({ message: "Error occurred while fetching blog", error: err.message });
  }
});

app.patch('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found", success: false });
    }
    return res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (err) {
    return res.status(500).json({ message: "Error occurred while updating blog", error: err.message });
  }
});

app.delete('/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found", success: false });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error occurred while deleting blog", error: err.message });
  }
});

// Server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
  dbConnect();
});
