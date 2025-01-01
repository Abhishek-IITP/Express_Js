
const { error } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json())

function  fun(req,res,next){
    // console.log(req.body)
    console.log("hello");
    next()
}
app.use(fun)  //middleware

app.get("/",(req,res)=>{
    return res.status(200).json({message:"Hello World"})
    
})

function fileDetail(req,res,next){
    let data= Date.now() + " " + req.meathod
    fs.appendFile(__dirname + "/logFiles.txt", `${data}\n` ,(err)=>{
        next()
    })
}
app.post("/blogs",fileDetail,(req,res)=>{
    console.log(req.body)
    return res.status(200).json({message:"Hello World"})
    
})

app.use((req,res,next)=>{
    return res.status(500).send("Something broke!")

})
app.use((error,req,res,next)=>{
    console.log(error)

    res.status(500).json({message :"Something went wrong"})
})
app.listen(3000,()=>{
    console.log('sever chalu ho gya')
})