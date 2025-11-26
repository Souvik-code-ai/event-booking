const jwt=require("jsonwebtoken");
require("dotenv").config();
async function generateJwt(header) {
    const token=jwt.sign(header,process.env.secret_key,{expiresIn:"1h"});
    return token;
}
module.exports=generateJwt;