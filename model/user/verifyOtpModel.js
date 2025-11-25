const mongoose=require("mongoose");
const verifySchema=mongoose.Schema({
    "emailForVerify":{type:String,required:true},
    "otp":{type:String,required:true}
});
const verifyOtp=mongoose.model("otpverification",verifySchema);
module.exports=verifyOtp;