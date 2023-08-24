const bcrypt = require("bcrypt");


const Admin = require("../models/Admin");
const Token = require("../models/Token");
const Information = require("../models/Information");
const User = require("../models/User");
const Suggestion = require("../models/Suggestion");

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
    } catch (error) {
    }
}

const postNews = async (req, res) => {
    try {
        const news = req.body;
        news.posted_by = res.locals.admin;

        const result = await Information.create(news);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const postSuggestion = async (req, res) => {
    try {
        const suggestion = req.body;
        suggestion.posted_by = res.locals.admin;

        const result = await Suggestion.create(suggestion);

        // activate suggestion immediately
        await result.activate();
        // send ok
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const ping = async (req, res) => {
    try {
        res.status(200).json({pong: true});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    login,
    logout,
    postNews,
    postSuggestion,
    ping
}