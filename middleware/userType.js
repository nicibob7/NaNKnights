const User = require("../models/User");
const Admin = require("../models/Admin");
const Token = require("../models/Token");

module.exports = async (req, res) => {
    let validToken;
    try {
        const token = req.headers.cookie.split("=")[1];
        console.log(token);
        if (token.length === 0) {
            // token is empty? guest user
            throw new Error("Empty Token");
        } else {
            validToken = await Token.getOneByToken(token);

            const user = await User.getByUsername(validToken.account_username);

            // check token expiration
            if (await validToken.isExpired()) {
                throw new Error("Token expired");
            }

            // delete email and password from user
            delete user.email;
            delete user.password;

            return res.status(200).json({account: user});
        }
    } catch (err) {
        // user might be an admin
        try {
            if (validToken) {
                const admin = await Admin.getByUsername(validToken.account_username);

                // check token expiration
                if (await validToken.isExpired()) {
                    throw new Error("Token expired");
                }

                // delete password from admin
                delete admin.password;

                return res.status(200).json({account: admin});
            } else {
                throw new Error("No token");
            }
        } catch (err) {
            console.log(err)
            res.clearCookie("authorization");
            return res.status(200).json({account: "guest"});
        }


    }
}