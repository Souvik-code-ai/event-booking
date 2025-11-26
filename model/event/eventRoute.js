//let eventCollection=require("./eventModel");
// let userCollection=require("../user/userModel");
const {checkOrgAdmin}=require("../middleware");
const express=require("express");
const app=express();
const router=express.Router();
const {eventControllerPost,eventControllerGet, eventControllerGetData,eventPost}=require("./eventController");
app.use(express.json());
router.post("/post/events",checkOrgAdmin,eventPost);
router.get("/getdata/events",eventControllerGetData)
router.get("/get/events",eventControllerGet);
module.exports=router;