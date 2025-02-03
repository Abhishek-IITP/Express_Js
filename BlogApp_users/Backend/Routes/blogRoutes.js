const express = require('express');
const {createBlogs , getBlogs, getBlogsById, updateBlogs, deleteBlogs} = require('../controllers/blogController');
const verifyUser = require('../Middlewares/auth');

const route= express.Router();

route.post("/blogs", verifyUser ,createBlogs);

route.get("/blogs",getBlogs );

route.get("/blogs/:id",getBlogsById);

route.patch("/blogs/:id",verifyUser,updateBlogs);

route.delete("/blogs/:id", deleteBlogs);



module.exports=route
