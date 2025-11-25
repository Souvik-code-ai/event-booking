//let eventCollection=require("./eventModel");
// let userCollection=require("../user/userModel");
const express=require("express");
const app=express();
const router=express.Router();
const {eventControllerPost,eventControllerGet, eventControllerGetData}=require("./eventController");
app.use(express.json());
router.post("/post/events",eventControllerPost);
router.get("/getdata/events",eventControllerGetData)
router.get("/get/events",eventControllerGet);
module.exports=router;