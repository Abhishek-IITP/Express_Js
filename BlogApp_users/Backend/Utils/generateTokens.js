const jwt = require("jsonwebtoken")

async function generateJWT(payload){
    let token= await jwt.sign(payload," " )
    // let token= await jwt.sign(payload,"asdad", {expiresIn:"30m"} )
    return token
}

async function verifyJWT(token) {
    console.log(token)
try {
    let isValid = await jwt.verify(token,"asdad")
    console.log(isValid)
    return true;
    
} catch (error) {
    return false
}

    
}

async function decodeJWT(token) {
    let decoded= await jwt.decode(token);
    return decoded;
    
}


module.exports = {generateJWT, verifyJWT, decodeJWT}