const express =require('express');
const  app= express();

app.get(["/","/abhi"],(req,res)=>{
    res.send("Get Meathod")
})
app.post(["/","/abhi"],(req,res)=>{
    res.send("POST Meathod")
})
app.put(["/","/abhi"],(req,res)=>{
    res.send(" PUT Meathod")
})
app.patch(["/","/abhi"],(req,res)=>{
    res.send("PATCH Meathod")
})
app.delete(["/","/abhi"],(req,res)=>{
    res.send("DELETE Meathod")
})
app.listen(3000,()=>{
    console.log("chal gya server")
})