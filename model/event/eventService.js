const eventCollection=require("./eventModel");
const userCollection=require("../user/userModel");
async function filterEventService(userData){
    return await userCollection.find(userData);
}
async function createEventService(userData) {
    return await eventCollection.create(userData);
}
async function getEventServiceData(){
    return await eventCollection.find({});
}
async function getEventService() {
    return await eventCollection.find({
        status:"active",
        "venue.city":"noida",
        availableSeats:{$gt:0},
        date:{
            $gte:new Date("2001-02-10"),
            $lte:new Date("2025-03-23")
        },
        $or:[
            {title:{$regex:"dhishoom",$options:"i"}},
            {description:"movie"}
        ],
    });
 //   return await eventCollection.find({});
}

module.exports = {
    createEventService,
    getEventService,getEventServiceData,filterEventService
};