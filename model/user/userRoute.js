let express=require("express");
let app=express();
let router=express.Router();
let {userControllerPost,userControllerGet, userControllerGetById, genertateOtp,verifyOtp}=require("./userController");

app.use(express.json());
router.post("/post/users",userControllerPost);
router.get("/get/users",userControllerGet);
router.get("/users/:id/bookings",userControllerGetById);
router.post("/email/users",genertateOtp);
router.post("/otp/users",verifyOtp);

module.exports=router;