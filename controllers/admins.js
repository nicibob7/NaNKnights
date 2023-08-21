const bcrypt = require("bcrypt");


const Admin = require("../models/Admin");
const Token = require("../models/Token");
const User = require("../models/User");
const Suggestion = require("../models/Suggestion");

async function register(req, res) {
    const data = req.body;
    try {
        const newAdmin = await Admin.create(data);
        return res.status(201).json(newAdmin);
    } catch (error) {
        return res.status(400).json({error: error.detail});
    }
}

async function login(req, res) {
    const data = req.body;

    try {
        const foundAdmin = await Admin.getByUsername(data.username);
        if (!foundAdmin) {
            throw new Error("Unable to locate admin.");
        }

        const adminAuthenticated = await bcrypt.compare(data.password, foundAdmin.password);

        if (!adminAuthenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            const token = await Token.create(foundAdmin.username);

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

const logout = async (req, res) => {
    try {
        await Token.deleteByToken(res.locals.token);
        res.clearCookie("authorization");
        // TODO: serve an admin login page to /admins
        res.status(302).redirect("/admins");
    } catch (error) {}
}


module.exports = {
    register,
    login,
    logout
}