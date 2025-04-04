const express = require ('express');
const mongoose = require ('mongoose');

const app = express()

async function connectDb(){
    try{
        await mongoose.connect('mongodb://localhost:27017/phalaDd')
        console.log('Ho gya Dd connect')
    }catch(error){}
}

const userData = new mongoose.Schema({
    firstName: {
        type:String,
    },
    email: {
        type:String,
        // required: true,
        // unique: true
    },
    password: String
})

const userModel= mongoose.model("User",userData )

async function createUssers(){
    try{
        let newUser = await userModel.create({email:'a3@gmail.com', firstName:'Abhishek', password:"a123"})
        console.log(newUser)
    }catch(error){console.log(error.code)}
}

app.listen(3000,()=>{
    console.log('chal gya server oyeee...!!!')
    connectDb()
    createUssers()
})