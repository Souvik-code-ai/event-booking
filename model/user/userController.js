const {createUserService,getUsersService,getUsersServiceById,findEmail,otpVerify} = require("./userService");
const emailCollection=require("./generateOtpModel");

async function userControllerPost(req, res) {
    try {
        const data = await createUserService(req.body);
        if (!data) {
            res.status(404).json({ message: "data not found." });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
async function genertateOtp(req,res){
    try{
        const givenEmail=await findEmail(req.body);
        if(!givenEmail){
            res.status(404).json({message:"No email found"});
        }
        res.status(200).json(givenEmail);
    }catch(err){
        return res.status(404).json({message:err.message});
    }
}
async function verifyOtp(req,res){
    try{
        const matchedOtp=await otpVerify(req.body);
        res.status(200).json(matchedOtp);
    }catch(err){
        res.status(404).json({message:err.mesaage});
    }
}
async function userControllerGet(req, res) {
    try {
        const dataAchieved = await getUsersService({});
        if (!dataAchieved) {
            res.status(404).json({ message: "data not found." });
        }
        res.status(200).json(dataAchieved);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
async function userControllerGetById(req, res) {
    try {
        const usersId=req.params;
        const dataAchieved = await getUsersServiceById(usersId);
        if (!dataAchieved) {
            res.status(404).json({ message: "data not found." });
        }
        res.status(200).json(dataAchieved);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
module.exports={
    userControllerPost,userControllerGet,userControllerGetById,verifyOtp,genertateOtp
};