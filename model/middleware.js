require("dotenv").config();
const jwt = require("jsonwebtoken");
function extractJwt(userHeaders) {
    if (userHeaders.authorization && userHeaders.authorization.startsWith('Bearer')) {
        const jwtToken = userHeaders.authorization.replace('Bearer ', '');


        return jwtToken;
    }

}

function verifyJwtToken(jwtToken) {
    const jsonWebToken = jwt.verify(jwtToken, process.env.secret_key);
    return jsonWebToken;

}
module.exports = { verifyJwtToken };
function checkOrgAdmin(req,res,next) {
    const extract = extractJwt(req.headers);
    console.log("extract", extract);
    const extrarctToken = verifyJwtToken(extract);
    console.log("extract token", extrarctToken);
    req.user=extrarctToken;
    next();

}

module.exports = {
    checkOrgAdmin
};