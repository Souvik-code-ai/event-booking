const bookingCollection = require("./bookingModel");
// let userCollection=require("../user/userController");
// let eventCollection=require("../event/eventController");
let eventSchema = require("../event/eventModel");
let userSchema=require("../user/userModel");

async function createBookingService(eventId,userId,userData) {
    console.log(userData);
    let matchEvent = await eventSchema.findOne({ _id:eventId });
   // console.log(matchEvent);
    if(!userData.bookedAt) {
        return { error: true, status: 400, message: "bookedAt is required" };
    }
    if (!matchEvent) {
        return { error: true, status: 404, message: "Event not found" };
    }
    let matchedField = await bookingCollection.find({ eventId:eventId, userId:userId });
    console.log(matchedField);
    if(matchedField.length !== 0) {
        return { error: true, status: 409, message: "Duplicate booking" };
    }
    if (!userData.seats || userData.seats <= 0) {
        return { error: true, status: 409, message: "Low seats" };
    }
    userData.amount = (userData.seats * matchEvent.pricePerSeat);
 //   console.log(userData.amount);
    console.log(matchEvent.availableSeats);
    matchEvent.availableSeats -= userData.seats;
    console.log(matchEvent.availableSeats);
    await eventSchema.findByIdAndUpdate(eventId,       {availableSeats:     matchEvent.availableSeats},{new:true});
    //await matchEvent.save();
    let day = new Date(userData.bookedAt);
    let dayIndex = day.getDay();
    if (dayIndex === 0 || dayIndex === 6) {
        userData.amount *= 1.20;
    }
    if (userData.seats > 5) {
        userData.amount *= 0.90;
    }
    //console.log(matchedField[0]?.amount);
    userData.amount = Number(userData.amount.toFixed(2));
    userData.status = "confirmed";
    userData.cancelledAt=null;
    await matchEvent.save();
    return await bookingCollection.create(userData);

}

//return await bookingCollection.create(userData);


async function getBookingService() {
    return await bookingCollection.find({});
}
async function cancelBookingService(userParams){
    let matchedId=await bookingCollection.findOne({userId:userParams.id});
    if(!matchedId){
        return {error:true,status:404,message:"No booking found."};
    }
    let matchRole=await userSchema.findOne({_id:matchedId.userId});
    console.log(matchRole.role);
    if(matchRole.role==="user"){
        let deletedBooking=await bookingCollection.findByIdAndDelete(matchedId._id);
        return deletedBooking;

    }
    else if(matchRole.role==="organizer"){
        let deletedBooking=await eventSchema.findOne({organizers:matchRole._id})
        let deleted_booking=await bookingCollection.find({userId:deletedBooking.organizers});
        let deleteBooking=await bookingCollection.findByIdAndDelete(deleted_booking._id);
        eventSchema.availableSeats+=bookingCollection.seats;
        return deleteBooking;
    }
}
async function getBookingCollectionByeventId(userParams) {
    let matchedEventId=await bookingCollection.find({eventId:userParams.eventId});
    //console.log(matchedEventId);
    if(matchedEventId.length===0){
        return {error:true,status:404,message:"No booking found"};
    }
    return matchedEventId;
}

module.exports = {
    createBookingService,
    getBookingService,
    cancelBookingService,
    getBookingCollectionByeventId
};