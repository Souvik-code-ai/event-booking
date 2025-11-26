const mongoose=require("mongoose");
const verifySchema=mongoose.Schema({
    "email":{type:String,required:true},
    "otp":{type:String,required:true}
});
const verifyOtp=mongoose.model("otpverification",verifySchema);
module.exports=verifyOtp;