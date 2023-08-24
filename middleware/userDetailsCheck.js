const User = require("../models/User");


async function checkUserDetails(req, res, next){
    try {
        const user = await User.getByUsername(res.locals.username);
        const userDetailsCheck = await user.userDetailsCheck();
        if(userDetailsCheck){
            throw new Error("Account not full updated");
        }

        next();
    } catch (err){
        res.status(403).json({error: "Account not full updated"});
    }
}

module.exports = checkUserDetails;