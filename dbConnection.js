 
let mongoose=require("mongoose");
require('dotenv').config()
// console.log('Mongo Uri',process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log("database not connected",err.message);
});
module.exports=mongoose;