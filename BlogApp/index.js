const express = require('express');
const app = express();

app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000');
})


app.use(express.json())
const blogs=[]

app.post('/blogs',(req,res)=>{
    blogs.push(req.body)

   return res.json({message:"Blog created successfully"})

})
app.get('/blogs',(req,res)=>{
    let publicBlogs=blogs.filter(blog=>!blog.draft)
    return res.json({...publicBlogs})
    
})
app.get('/blogs/:id',(req,res)=>{
    
})

app.patch('/blogs/:id',(req,res)=>{

})
app.delete('/blogs/:id',(req,res)=>{

})
