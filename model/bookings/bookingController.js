const { createBookingService, getBookingService,cancelBookingService,getBookingCollectionByeventId} = require("./bookingService");
//let userCollection = require("../user/userController");
const userSchema=require("../user/userModel");
const eventSchema=require("../event/eventModel");
//let eventCollection = require("../event/eventController");
const bookingCollection = require("./bookingModel");
//let bookingCollection=require("./bookingModel");
async function bookingControllerPost(req, res) {
    try {

        const {eventId,userId}=req.body;
        console.log(eventId);
        //console.log(req.body);
        const userData=req.body;
        // req.body.organizers=matchRole._id;
        //req.body.availableSeats=req.body.totalSeats;
        // req.body.userId = userSchema._id;
        // req.body.eventId = eventSchema._id;
        const data = await createBookingService(eventId,userId,userData);
        if (!data) {
            res.status(404).json({ message: "data not found." });
        }
        res.status(200).json(data);
        //  console.log(data);
    } catch (err) {
        res.status(404).json({ message: err.message })//here message of err.message is the same name of service file
        console.log(err);
    }
}
async function bookingControllerGet(req, res) {
    try {
        const dataAchieved = await getBookingService({});
        if (!dataAchieved) {
            res.status(404).json({ message: "data not found." });
        }
        res.status(200).json(dataAchieved);
        console.log(dataAchieved);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
async function bookingControllerCancel(req, res) {
    try {
        const userParams=req.params;
        const dataAchieved = await cancelBookingService(userParams);
        if (!dataAchieved) {
            res.status(404).json({ message: "data not found." });
        }
        res.status(200).json(dataAchieved);
        console.log(dataAchieved);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
async function bookingControllerGetByeventId(req, res) {
    try {
        const userParams=req.params;
        const dataAchieved = await getBookingCollectionByeventId(userParams);
        if (!dataAchieved) {
            res.status(404).json({ message: "data not found." });
        }
        res.status(200).json(dataAchieved);
        console.log(dataAchieved);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

module.exports = {
    bookingControllerPost, bookingControllerGet,bookingControllerCancel,bookingControllerGetByeventId
};