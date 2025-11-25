let express=require("express");
let port=500;
let user=require("./model/user/userRoute");
let event=require("./model/event/eventRoute");
let booking=require("./model/bookings/bookingRoute");
let database=require("./dbConnection");
let app=express();
app.use(express.json());
app.use("/api",user);
app.use("/api",event);
app.use("/api",booking);
app.listen(port,()=>{
    console.log("server created.");
});