//let eventCollection = require("./eventModel");
const { extractJwt } = require("../user/userController")
const userCollection = require("../user/userModel");
const { verifyJwtToken } = require("../user/verifyJwtToken");
const { getEventServiceData, getEventService, eventControllerPost } = require("./eventService");
async function eventPost(req, res) {
    try {
        console.log("middleware",req.user);
        if (req.user.header_role !== "organizer" && req.user.header_role !== "admin") {
            res.status(404).json("Role of user is not authorized.");

        }
        req.body.organizer=req.user.header_id;
        const dataPost = await eventControllerPost(req.body);
        if (!dataPost) {
            res.status(404).json("Data not found");
        }
        res.status(200).json(dataPost);


    } catch (err) {
        console.log(err.message);
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
module.exports = {
    eventControllerPost, eventControllerGetData, eventControllerGet, eventPost
};
async function expireEvents(req, res) {
    try {
        const expiredEvent = await expireEventByDate()
    } catch (err) {

    }
}