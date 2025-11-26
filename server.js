const express=require("express");
const chalk=require("chalk");
const port=500;
const user=require("./model/user/userRoute");
const event=require("./model/event/eventRoute");
const booking=require("./model/bookings/bookingRoute");
const database=require("./dbConnection");
const app=express();
app.use(express.json());
app.use("/api",user);
app.use("/api",event);
app.use("/api",booking);
app.listen(port,()=>{
    console.log(chalk.greenBright.bold(`server is running on ${port}`));
});