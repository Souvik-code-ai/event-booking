let mongoose =require("mongoose");
let eventSchema=mongoose.Schema({
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
    "organizers":Array,
    "status":{type:String,enum:["active","cancelled","expired"]},
    "createdAt":{type:Date}
});
let event=mongoose.model("Event",eventSchema);
module.exports=event;