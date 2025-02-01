const express = require('express');
const {createBlogs , getBlogs, getBlogsById, updateBlogs, deleteBlogs} = require('../controllers/blogController');

const route= express.Router();

route.post("/blogs", createBlogs);

route.get("/blogs",getBlogs );

route.get("/blogs/:id",getBlogsById);

route.patch("/blogs/:id",updateBlogs);

route.delete("/blogs/:id", deleteBlogs);



module.exports=route
