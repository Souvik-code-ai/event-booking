const mongoose =require("mongoose");
const userSchema=mongoose.Schema({
    "name":{type:String,required:false},
    "email":{type:String,unique:true,required:true},
    "phone":{type:Number,unique:true,required:false},
    "role":{type:String,enum:["user","organizer","admin"],required:true,default:"user"},
    "createdAt":{type:Date,default:Date.now()}
});
// const otpSchema=mongoose.Schema({
//     "emailForOtp":{type:String,required:true}
// });
const user=mongoose.model("User",userSchema);
// const otp=mongoose.model("otp",otpSchema);
module.exports=user;
// module.exports=otp;