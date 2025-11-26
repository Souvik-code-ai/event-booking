const eventCollection = require("./eventModel");
const userCollection = require("../user/userModel");
const { extractJwt } = require("../user/userController");

// async function createEventService(userData, userHeaders) {
//     const extractJwt = extractJwt(userHeaders);
//     if (extractJwt.role === "organizer" || extractJwt.role === "admin") {
//         return await eventCollection.create(userData);
//     }
//     else {
//         return { error: true, status: 404, message: "User is not authorized" };

//     }
// }
async function eventControllerPost(data) {
    try {
        // let reqOrgnizers=req.body.organizers;
        // req.body.organizers = matchRole._id;
        data.availableSeats = data.totalSeats;
        return await eventCollection.create(data);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}
async function getEventServiceData() {
    return await eventCollection.find({});
}
async function getEventService() {
    return await eventCollection.find({
        status: "active",
        "venue.city": "noida",
        availableSeats: { $gt: 0 },
        date: {
            $gte: new Date("2001-02-10"),
            $lte: new Date("2025-03-23")
        },
        $or: [
            { title: { $regex: "dhishoom", $options: "i" } },
            { description: "movie" }
        ],
    });
    //   return await eventCollection.find({});
}

module.exports = {
    // createEventService,
    getEventService, getEventServiceData,eventControllerPost
};