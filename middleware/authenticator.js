const Token = require("../models/Token");

async function authenticator(req, res, next) {
    try {
        const extractedToken = req.headers.cookie.split("=")[1];

        if (extractedToken.length === 0) {
            throw new Error("Empty Token");
        } else {
            const validToken = await Token.getOneByToken(extractedToken);

            if(await validToken.isExpired()){
                throw new Error("Token expired");
            }

            res.locals.token = extractedToken;
            res.locals.user = validToken.username;
            next();
        }
    } catch (err) {
        res.status(403).redirect("/");
    }
}

module.exports = authenticator;
