const bcrypt = require("bcrypt");

const User = require("../models/User");
const Token = require("../models/Token");
const EmailToken = require("../models/EmailToken");

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

async function register(req, res) {
    const data = req.body;

    // Generate a salt with a specific cost
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);

    // Hash the password
    data["password"] = await bcrypt.hash(data["password"], salt);
    try {
        // create a new user
        const newUser = await User.create(data);
        // create an activation link for the new user
        const activationUrl = await EmailToken.create(newUser.username);

        return res.status(201).json({url: activationUrl});
    } catch (error) {
        return res.status(400).json({error: error.detail});
    }
}

async function login(req, res) {
    try {
        const data = req.body;

        const user = await User.getByUsername(data.username);

        // check if user is activated
        if (!await user.isActivated()) {
            throw new Error("User is not activated.");
        }

        const authenticated = await bcrypt.compare(data.password, user.password);

        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            const token = await Token.create(user.username);

            res
                .cookie("authorization", token.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    domain: "localhost",
                    path: "/",
                    priority: "high",
                    maxAge: 30 * 60 * 1000, // 30 minutes maxAge as defined in database table
                })
                .status(200)
                .json({authorized: true});
        }
    } catch (error) {
        res.status(403).json({error: "Unauthorized"});
    }
}

async function logout(req, res) {
    try {
        await Token.deleteByToken(res.locals.token);
        res.clearCookie("authorization");
        res.status(302).redirect("/");
    } catch (error) {}
}

const loggedInCheck = async (req, res) => {
    res.redirect("/homepage");
};

const verify = async (req, res) => {
    try {

        const emailToken = await EmailToken.getOneByToken(req.params.emailToken);
        const user = await User.getByUsername(emailToken.username);

        await user.activate();
        await EmailToken.deleteByUsername(emailToken.username);

        res.status(302).redirect("/login");
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = {
    register,
    login,
    logout,
    loggedInCheck,
    verify,
};
