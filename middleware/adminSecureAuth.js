const Token = require("../models/Token");
const Admin = require("../models/Admin");

async function authenticator(req, res, next) {
    try {
        const adminToken = req.headers.cookie.split("=")[1];

        if (adminToken.length === 0) {
            throw new Error("Empty Token");
        } else {
            const validToken = await Token.getOneByToken(adminToken);
            const admin = await Admin.getByUsername(validToken.account_username);

            // check token expiration
            if(await validToken.isExpired()){
                throw new Error("Token expired");
            }

            // save token and username to res.locals for the next endpoint
            res.locals.token = adminToken;
            res.locals.admin = admin.username;
            next();
        }
    } catch (err) {
        res.status(403).json({error: "Unauthorized"});
    }
}

module.exports = authenticator;