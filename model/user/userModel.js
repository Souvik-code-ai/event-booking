let mongoose =require("mongoose");
let userSchema=mongoose.Schema({
    "name":{type:String,required:true},
    "email":{type:String,unique:true,required:true},
    "phone":{type:Number,unique:true,required:true},
    "role":{type:String,enum:["user","organizer","admin"],required:true},
    "createdAt":{type:Date,default:Date.now()}
});
let user=mongoose.model("User",userSchema);
module.exports=user;