const express = require ('express');
const app= express();
app.use(express.json());
const mongoose = require('mongoose');

async function dbConnect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/blogDatabase')
        console.log("db connected Successfully")
    } catch (error) {
        console.log(error)   
    }   
}

const userSchema = new mongoose.Schema({
    name:String,
    email : {
        type :String,
        unique :true
    },
    password :String
})

const User = mongoose.model("User",userSchema)



app.post('/users', async(req,res)=>{
    const {name,email,password}= req.body;
    try{
        if(!name){
            return res.status(400).json({
                message :"fill the all req fileds",
                success : false
            })
        }
        if(!email){
            return res.status(400).json({
                message :"Please enter the email",
                success : false
            })
        }
        if(!password){
            return res.status(400).json({
                message :"please enter your Password",
                success : false
            })
        }
        const checkForExistingUser = await User.findOne({email})
        if(checkForExistingUser){
            return res.status(400).json({
                success :false,
                message : "User already exist with this email"
            })
        }
        const newUser = await User.create({name,email,password})
        return res.status(200).json({
            message :"user created",
            success : true,
            newUser
        })
        

        
    }catch(err){
        return res.status(500).json({
            message :"please try again",
            success : false,
            error : err.message
        })
    }
})

app.get('/users',(req,res)=>{
    try{
        return res.status(200).json({
            users,
            success : true
        })
    }
    catch(err){
        return res.status(500).json({
            message :"Error occured while fetching data", 
            success : false
    })}
})
app.get('/users/:id',(req,res)=>{
    const {id}= req.params;
    try{
        const user = users.filter((user)=>user.id==req.params.id);
        if(user.length==0){
            return res.status(404).json({
                message :"user not found",
                success : false
            })
        }
        return res.status(200).json({
            user,
            success : true
        })
    }
    catch(err){
        return res.status(500).json({
            message :"Error occured while fetching data", 
            success : false
    })}
})
app.patch('/users/:id',(req,res)=>{
    const {id}= req.params;
    try{
        const updatedUser = users.map((user)=>user.id==id ? {...user, ...req.body} : user)
        users= updatedUser
        const userUpdated = updatedUser.some(user=>user.id==id);
        if (!userUpdated) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        return res.status(200).json({
            message :"user updated",
            success : true,
        })
        

    }
    catch(err){
        return res.status(500).json({
            message :"Error occured while fetching data", 
            success : false
    })}
})
app.delete('/users/:id',(req,res)=>{
    const {id}=req.params
    try{
        const deleteUser = users.findIndex((user)=>user.id ==id)
        users.splice(deleteUser,1)

        return res.status(200).json({
            message :"user updated",
            success : true,
        })  
    }
    catch(err){
        return res.status(500).json({
            message : "Error occured while fetching data",
            success : false
        })
        
    }
})


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
app.listen(3000,()=>{
    console.log('chal raha hai');
    dbConnect();
})