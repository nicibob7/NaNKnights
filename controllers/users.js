const bcrypt = require("bcrypt");

const User = require("../models/User");
const Token = require("../models/Token");
const EmailToken = require("../models/EmailToken");
const mailer = require("../security/email");

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/;


async function register(req, res) {
    try {
        const data = req.body;

        //check if password is valid
        if (!PASSWORD_REGEX.test(data.password)) {
            throw new Error("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.");
        }

        // Generate a salt with a specific cost
        const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);

        // Hash the password
        data["password"] = await bcrypt.hash(data["password"], salt);

        // create a new user
        const newUser = await User.create(data);
        // create an activation link for the new user
        const activationUrl = await EmailToken.create(newUser.username);
        // send the link via email
        await mailer(newUser.username, activationUrl, newUser.email);

        return res.status(201).json({status: "success"});
    } catch (error) {
        if(error.detail){
            return res.status(400).json({error: error.detail});
        }
        return res.status(400).json({error: error.message});
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
    } catch (error) {
    }
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

const updateDetails = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.getByUsername(res.locals.user);

        await user.updateBasicDetails(data);

        res.status(200).json({status: "success"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const sendResetPasswordEmail = async (req, res) => {
    try {
        const data = req.body;
        const user = await User.getOneByEmail(data.email);

        // delete any existing reset password links for the user
        await EmailToken.deleteByUsername(user.username);

        // create a new reset password link for the user
        const resetUrl = await EmailToken.create(user.username);

        // send the link via email
        await mailer(user.username, resetUrl, user.email);

        res.status(200).json({status: "success"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const resetPassword = async (req, res) => {
    try {
        const password = req.body;
        const user = await User.getByUsername(res.locals.user);

        await user.updatePassword(password);

        res.status(200).json({status: "success"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    register,
    login,
    logout,
    loggedInCheck,
    verify,
    updateDetails,
    sendResetPasswordEmail,
    resetPassword,
};
