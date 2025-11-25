let mongoose=require("mongoose");
// let event=require("../event/eventModel");
// let user=require("../user/userModel");
let bookingSchema=mongoose.Schema({
    "eventId":{type:String,required:true},
    "userId":{type:String,required:true},
    "seats":{type:Number,required:true},
    "amount":{type:Number,required:true},
    "status":{type:String,enum:["confirmed","cancelled","refunded"],required:true},
    "bookedAt":{type:Date},
    "cancelledAt":{type:Date,default:null}
});
let booking=mongoose.model("Booking",bookingSchema);
module.exports=booking;