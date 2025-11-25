let {createUserService,getUsersService,getUsersServiceById} = require("./userService");

async function userControllerPost(req, res) {
    try {
        let data = await createUserService(req.body);
        if (!data) {
            res.status(404).json({ message: "data not found." });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
async function userControllerGet(req, res) {
    try {
        let dataAchieved = await getUsersService({});
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
        let usersId=req.params;
        let dataAchieved = await getUsersServiceById(usersId);
        if (!dataAchieved) {
            res.status(404).json({ message: "data not found." });
        }
        res.status(200).json(dataAchieved);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
module.exports={
    userControllerPost,userControllerGet,userControllerGetById
};