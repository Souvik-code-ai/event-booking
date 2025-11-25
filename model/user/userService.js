const userCollection = require("./userModel");
let bookingSchema=require("../bookings/bookingModel");
let eventSchema=require("../event/eventModel");

async function createUserService(userData) {
    return await userCollection.create(userData);
}

async function getUsersService() {
    return await userCollection.find({});
}
async function getUsersServiceById(usersId){
    let userIdOfBooking=await bookingSchema.find({userId:usersId.id});
    console.log(userIdOfBooking);
    let eventIdOfBooking=userIdOfBooking.map(u=>u.eventId);
    console.log(eventIdOfBooking);
    let bookingSummary=await eventSchema.find({_id:{$in:eventIdOfBooking}});
    return bookingSummary;

}

module.exports = {
    createUserService,
    getUsersService,getUsersServiceById
};
