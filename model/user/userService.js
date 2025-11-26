const userCollection = require("./userModel");
const generateJwt = require("./jwtTokenGeneration");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bookingSchema = require("../bookings/bookingModel");
const eventSchema = require("../event/eventModel");
const emailSchema = require("./generateOtpModel");
const otpVerifySchema = require("./verifyOtpModel");
const otp = require("./generateOtpModel");
//const { extractJwt } = require("./userService");
const { extractJwt } = require("./userController");
async function createUserService(userData) {
    return await userCollection.create(userData);
}

async function getUsersService() {
    return await userCollection.find({});
}
async function findEmail(userData) {
    try {
        console.log(userData);
        const emailAddress = userData.emailForOtp.toLowerCase();
        userData.emailForOtp = emailAddress;
        const matchedEmail = await userCollection.findOne({ email: emailAddress });

        if (!matchedEmail) {
            const generatedotp = Math.floor(100000 + Math.random() * 900000);
            console.log(generatedotp);
            userData.otp = generatedotp;
            // userCollection.email=userData.emailForOtp;
            await userCollection.create({ email: userData.emailForOtp });
            console.log("from if usedata", userData);
            return await emailSchema.create(userData);
        }
        else if (matchedEmail) {
            const generatedotp = Math.floor(100000 + Math.random() * 900000);
            userData.otp = generatedotp;
            console.log("from else", userData);

            return await emailSchema.create(userData);
        }

    } catch (error) {
        console.log(error);
    }


}
async function otpVerify(userData, userHeaders) {
    try {
        // console.log(userData);
        const user = await emailSchema.findOne({ emailForOtp: userData.email }).sort({ _id: -1 });
        const matchEmail = await userCollection.findOne({ email: userData.email }).select("-password")
        //console.log(user);

        if (user.otp !== userData.otp) {
            return { error: true, status: 404, message: "wrong Otp" };
        }
        const header = {
            header_id: matchEmail._id,
            header_email: matchEmail.email,
            header_role: matchEmail.role

        };
        //console.log("header", header);

        const jwtToken = await generateJwt(header);


        // console.log("jwt", jwtToken);
        return { success: true, status: 200, user: matchEmail, token: jwtToken };

    } catch (error) {
        console.log("error", error)
        throw error;
    }



    // if(otpMatched.otp!==userData.otp){
    //     console.log("bdjbjb");
    //     return {error:true,status:404,message:"wrong Otp"};
    // }
}
async function getUsersServiceById(usersId) {
    const userIdOfBooking = await bookingSchema.find({ userId: usersId.id });
    console.log(userIdOfBooking);
    const eventIdOfBooking = userIdOfBooking.map(u => u.eventId);
    console.log(eventIdOfBooking);
    const bookingSummary = await eventSchema.find({ _id: { $in: eventIdOfBooking } });
    return bookingSummary;

}

module.exports = {
    createUserService,
    getUsersService, getUsersServiceById, findEmail, otpVerify
};
