const userCollection = require("./userModel");
const bookingSchema=require("../bookings/bookingModel");
const eventSchema=require("../event/eventModel");
const emailSchema=require("./generateOtpModel");
const otpVerifySchema=require("./verifyOtpModel");
const otp = require("./generateOtpModel");
async function createUserService(userData) {
    return await userCollection.create(userData);
}

async function getUsersService() {
    return await userCollection.find({});
}
async function findEmail(userData){
    console.log(userData);
    const emailAddress=userData.emailForOtp.toLowerCase();
    userData.emailForOtp=emailAddress;
    const matchedEmail=userCollection.findOne({email:emailAddress});
    if(!matchedEmail){
        const generatedotp=Math.floor(100000+Math.random()*900000);
        console.log(generatedotp);
        userData.otp=generatedotp;
        return await emailSchema.create(userData);
    }
    else if(matchedEmail){
        const generatedotp=Math.floor(100000+Math.random()*900000);
        userData.otp=generatedotp;
        const {otp}=userData;
        return await emailSchema.create(userData);
    }

}
async function otpVerify(userData){
   // console.log(userData);
    const otpMatched=await emailSchema.findOne({otp:userData.otp}) ;    
    console.log(otpMatched);
    if(!otpMatched){
        return {error:true,status:404,message:"wrong Otp"};
    }
    if(otpMatched.otp===userData.otp){
        return {success:true,status:200,message:"Otp verifiaction successful"};
    }
    // if(otpMatched.otp!==userData.otp){
    //     console.log("bdjbjb");
    //     return {error:true,status:404,message:"wrong Otp"};
    // }
}
async function getUsersServiceById(usersId){
    const userIdOfBooking=await bookingSchema.find({userId:usersId.id});
    console.log(userIdOfBooking);
    const eventIdOfBooking=userIdOfBooking.map(u=>u.eventId);
    console.log(eventIdOfBooking);
    const bookingSummary=await eventSchema.find({_id:{$in:eventIdOfBooking}});
    return bookingSummary;

}

module.exports = {
    createUserService,
    getUsersService,getUsersServiceById,findEmail,otpVerify
};
