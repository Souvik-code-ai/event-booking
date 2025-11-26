const mongoose =require("mongoose");
const eventSchema=mongoose.Schema({
    "title":{type:String,required:true},
    "description":{type:String,required:true},
    "venue":{
        "name":String,
        "city":String,
        "state":String,
        "address":String
    },
    "date":Date,
    "startTime":String,
    "endTime":String,
    "totalSeats":Number,
    "availableSeats":Number,
    "pricePerSeat":Number,
    "organizer":{type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    "status":{type:String,enum:["active","cancelled","expired"]},
    "createdAt":{type:Date,default:Date.now()}
});
const event=mongoose.model("Event",eventSchema);
module.exports=event;