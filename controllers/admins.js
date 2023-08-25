const bcrypt = require("bcrypt");
const os = require("os");
const Admin = require("../models/Admin");
const Token = require("../models/Token");
const Information = require("../models/Information");
const Suggestion = require("../models/Suggestion");
const Comment = require("../models/Comment");
const CommunityEvent = require("../models/CommunityEvent");
const User = require("../models/User");

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

            res.cookie("authorization", token.token, {
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
        console.log(news);
        news.posted_by = res.locals.admin;

        const result = await Information.create(news);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const updateNews = async (req, res) => {
    try {
        const news = req.body;
        news.posted_by = res.locals.admin;

        const result = await Information.update(news);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const deleteNews = async (req, res) => {
    try {
        const news = req.body;
        news.posted_by = res.locals.admin;

        const result = await Information.delete(news);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const postCommunityEvent = async (req, res) => {
    try {
        const event = req.body;
        event.posted_by = res.locals.admin;

        const result = await CommunityEvent.create(event);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const updateCommunityEvent = async (req, res) => {
    try {
        const event = req.body;
        event.posted_by = res.locals.admin;

        const result = await CommunityEvent.update(event);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const deleteCommunityEvent = async (req, res) => {
    try {
        const event = req.body;
        event.posted_by = res.locals.admin;

        const result = await CommunityEvent.delete(event);
        res.status(200).json(result);
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
const updateSuggestion = async (req, res) => {
    try {
        const suggestion = req.body;
        suggestion.posted_by = res.locals.admin;

        const result = await Suggestion.update(suggestion);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const deleteSuggestion = async (req, res) => {
    try {
        const suggestion = req.body;

        const result = await Suggestion.delete(suggestion);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const postComment = async (req, res) => {
    try {
        const comment = req.body;
        comment.posted_by = res.locals.admin;

        const result = await Comment.create(comment);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const deleteComment = async (req, res) => {
    try {
        const comment = req.body;
        comment.posted_by = res.locals.admin;

        const result = await Comment.delete(comment);
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

// google charts for admin functionality
const getServerInfo = async (req, res) => {
    try {
        const cpuNumbers = os.cpus().length;
        const ramUsage = os.freemem() / os.totalmem() * 100;
        const cpuUsage = os.loadavg();
        const heapPercentage = process.memoryUsage().heapUsed / process.memoryUsage().heapTotal * 100;

        // google charts layout
        //
        res.status(200).json({
            data: [
                ['Label', 'Value'],
                ['Memory', parseInt(ramUsage.toFixed(2))],
                ['CPU', parseInt((cpuUsage[0] / cpuNumbers).toFixed(2) * 100)],
                ['Node Mem', parseInt(heapPercentage.toFixed(2))]
            ]
        });

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getTotalUserCount = async (req, res) => {
    try {
        const result = await User.getUserCount();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getPostCountLastHour = async (req, res) => {
    try {
        const result = await Information.getPostCountLastHour();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getNonRegisteredUsers = async (req, res) => {
    try {
        const result = await User.getPercentageNonRegisteredUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getPendingSuggestions = async (req, res) => {
    try {
        const result = await Suggestion.getPending();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    login,
    logout,

    postNews,
    updateNews,
    deleteNews,

    postCommunityEvent,
    updateCommunityEvent,
    deleteCommunityEvent,

    postSuggestion,
    updateSuggestion,
    deleteSuggestion,
    getPendingSuggestions,

    postComment,
    deleteComment,

    ping,
    getServerInfo,
    getTotalUserCount,
    getPostCountLastHour,
    getNonRegisteredUsers,
}