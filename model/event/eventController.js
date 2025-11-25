//let eventCollection = require("./eventModel");
const userCollection=require("../user/userModel");
const { createEventService, getEventServiceData,getEventService,filterEventService } = require("./eventService");
async function eventControllerPost(req, res) {
    try {
       // let reqOrgnizers=req.body.organizers;
        const matchRole = await filterEventService({ role: "organizer" });
        req.body.organizers=matchRole.map(u=>u._id);
        console.log(matchRole);
        if (!matchRole) {
            return res.status(404).json({ message: "No organizer found." });
        }
       // req.body.organizers = matchRole._id;
        req.body.availableSeats = req.body.totalSeats;
        const data = await createEventService(req.body);
        if (!data) {
            res.status(404).json({ message: "data not  found." });
        }
        res.status(200).json(data);
        console.log(data);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
async function eventControllerGetData(req, res) {
    try {
        const dataAchieved = await getEventServiceData({});
        if (!dataAchieved) {
            res.status(404).json({ message: "no data found." });
        }
        res.status(200).json(dataAchieved);
        console.log(dataAchieved);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
async function eventControllerGet(req, res) {
    try {
        const dataAchieved = await getEventService({});
        if (!dataAchieved) {
            res.status(404).json({ message: "data not found." });
        }
        res.status(200).json(dataAchieved);
        console.log(dataAchieved);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
module.exports={
    eventControllerPost,eventControllerGetData,eventControllerGet
};