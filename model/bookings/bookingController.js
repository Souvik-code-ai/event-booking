const { createBookingService, getBookingService,cancelBookingService,getBookingCollectionByeventId} = require("./bookingService");
//let userCollection = require("../user/userController");
let userSchema=require("../user/userModel");
let eventSchema=require("../event/eventModel");
//let eventCollection = require("../event/eventController");
let bookingCollection = require("./bookingModel");
//let bookingCollection=require("./bookingModel");
async function bookingControllerPost(req, res) {
    try {

        const {eventId,userId}=req.body;
        console.log(eventId);
        //console.log(req.body);
        let userData=req.body;
        // req.body.organizers=matchRole._id;
        //req.body.availableSeats=req.body.totalSeats;
        // req.body.userId = userSchema._id;
        // req.body.eventId = eventSchema._id;
        let data = await createBookingService(eventId,userId,userData);
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
        let dataAchieved = await getBookingService({});
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
        let userParams=req.params;
        let dataAchieved = await cancelBookingService(userParams);
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
        let userParams=req.params;
        let dataAchieved = await getBookingCollectionByeventId(userParams);
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