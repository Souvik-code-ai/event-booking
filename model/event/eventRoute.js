//let eventCollection=require("./eventModel");
// let userCollection=require("../user/userModel");
let express=require("express");
let app=express();
let router=express.Router();
let {eventControllerPost,eventControllerGet, eventControllerGetData}=require("./eventController");
app.use(express.json());
router.post("/post/events",eventControllerPost);
router.get("/getdata/events",eventControllerGetData)
router.get("/get/events",eventControllerGet);
module.exports=router;