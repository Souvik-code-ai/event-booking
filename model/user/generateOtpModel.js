const mongoose=require("mongoose");
const otpSchema=mongoose.Schema({
    "emailForOtp":{type:String,required:true,unique:false},
    "otp":{type:String,required:true}
});
const otp=mongoose.model("emailforotp",otpSchema);
module.exports=otp;