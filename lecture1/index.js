const express=require("express");
const app=express();
const path = require('path')
const fs =require('fs');

let address=path.join(__dirname , 'index.html')
// function dynamicData(req, res, route) {
//     fs.readFile(address, { encoding: "utf-8" }, (err, data) => {
//         if (err) {
//             throw new Error(" Page Not found");
//         } else {
//             data = data.replace("[path]", route == "" ? "Code thread" : route);
//             res.send(data);
//         }
//     });
// }


/**
 * get request :- To retrive data from server;
 * post request :- To send data to server;
 * delete request :- To delete data from server;
 * patch request :- To update partial data on server;(like update only name or only email)
 * put request :- To update data on server;
 */
app.get([ "/" , "/about" , "/contactus" , "/akay"], (req,res) => {
    let path = req.url.split("/")[1];
        fs.readFile(address, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                throw new Error("Not found");
            } else {
                data  = data.replace("[path]" , path == "" ? "Abhi" : path)
                res.send(data);
            }
        })
});


// app.get('/',(req,res)=>{
//     // res.sendFile(path.join(__dirname , 'index.html'));
//     dynamicData(req,res , '');
// });
// app.get('/about',(req,res)=>{
//     dynamicData(req,res , 'about');
// });
// app.get('/contact',(req,res)=>{
//     dynamicData(req,res , 'conact');
// });
// console.log(path.join(__dirname , 'index.html'));

// app.post('/',(req,res)=>{
//     res.send('kya jii khaa rhe ho');
// })

// app.delete('/user',(req,res)=>{
//     res.send('Delete request')
// })
// app.patch('/user',(req,res)=>{
//     res.send('Patch request')
// })


app.listen(3000,()=>{
    console.log('chal gya server')
})