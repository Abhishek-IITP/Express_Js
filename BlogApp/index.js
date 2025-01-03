const express = require('express');
const app = express();


app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000');
})


app.use(express.json())
const blogs=[]

app.post('/blogs',(req,res)=>{
    blogs.push({...req.body, id : blogs.length +1})

   return res.json({message:"Blog created successfully"})

})
app.get('/blogs',(req,res)=>{
    let publicBlogs=blogs.filter(blog=>!blog.draft)
    return res.json({...publicBlogs})
    
})

app.get('/blogs/:id',(req,res)=>{
    const {id}=req.params
    let searchBlogs=blogs.filter(blog=>blog.id == id)
    return res.json({searchBlogs})
    
})

app.patch('/blogs/:id',(req,res)=>{
    const {id}=req.params
    let updatedBlog=blogs.findIndex(blog=>blog.id == id)
    blogs[updatedBlog]={...blogs[updatedBlog],...req.body}
    // let updatedBlog=blogs.map((blog,index) => blog.id == id ? ({...blogs[index],...req.body}) : blogs)
    // blogs=[...updatedBlog]
    return res.json({message : "Blog updated successfully"})
})
app.delete('/blogs/:id',(req,res)=>{
    const {id}=req.params
    let blogIndex=blogs.findIndex(blog=>blog.id == id)
    blogs.splice(blogIndex,1)
    return res.json({message : "Blog deleted successfully"})

})
