/**
 * get request :- To retrive data from server;
 * post request :- To send data to server;
 * delete request :- To delete data from server;
 * patch request :- To update partial data on server;(like update only name or only email)
 * put request :- To update data on server;
 */

// const express = require('express');
const http = require('http');;
const server = http.createServer(function(req,res){
    // 
    if(req.method=="GET"){
        res.end('GET meathod')
    }
    else if(req.method=="PUT"){
        res.end('PUT meathod')
    }
    else if(req.method=="PATCH"){
        res.end('PATCH meathod')
    }
    else if(req.method=="POST"){
        res.end('POST meathod')
    }
    else if(req.method=="DELETE"){
        res.end('DELETE meathod')
    }
});
// server.listen(3000,()=>{
//     console.log('chal gya server')
// })