const path = require("path");

const static_path = path.join(__dirname, "../static");

const Suggestion = require("../models/Suggestion");
const CommunityEvent = require("../models/CommunityEvent");
const Information = require("../models/Information");
const Comment = require("../models/Comment");

const postSuggestion = async (req, res) => {
    try {
        const data = req.body;

        data.username = res.locals.user;

        const suggestion = await Suggestion.create(data);
        // cache images for an hour
        //res.set('Cache-Control', 'public, max-age=3600');
        res.status(201).json(suggestion);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const getSuggestionById = async (req, res) => {
    try {
        const suggestion = await Suggestion.getById(req.params.id);
        res.status(200).json(suggestion);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const getSuggestions = async (req, res) => {
    try {
        const suggestions = await Suggestion.getAll();
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const getSuggestionsByPopularity = async (req, res) => {
    try {
        const news = await Suggestion.getSuggestionsByPopularity();
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getNews = async (req, res) => {
    try {
        const news = await Information.getAll();
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getNewsByLimit = async (req, res) => {
    try {
        const news = await Information.getNewsByNumber(req.params.id);
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getNewsById = async (req, res) => {
    try {
        const news = await Information.getNewsById(req.params.id);
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const postComment = async (req, res) => {
    try {
        const data = req.body;
        // get user from auth middleware
        data.posted_by = res.locals.user;

        const comment = await Comment.create(data);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getSuggestionsWithCommentCount = async (req, res) => {
    try {
        const suggestions = await Suggestion.getAllWithCommentCount();
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getCommentsBySuggestionId = async (req, res) => {
    try {
        const comments = await Comment.getAllBySuggestionId(req.params.id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const incrementVoteByID = async (req, res) => {
    try {
        const suggestions = await Suggestion.incrementVote(req.params.id);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const decrementVoteByID = async (req, res) => {
    try {
        const suggestions = await Suggestion.decrementVote(req.params.id);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


const postEvent = async (req, res) => {
    try {
        const data = req.body;

        data.username = res.locals.user;

        const event = await CommunityEvent.create(data);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
const getEvents = async (req, res) => {
    try {
        const events = await CommunityEvent.getAll();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getEventById = async (req, res) => {
    try {
        const events = await CommunityEvent.getEventById(req.params.id);
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const changeEventVolunteers = async (req, res) => {
    try {
        let data = req.body;
        data.username = res.locals.user;

        const events = await CommunityEvent.changeVolunteers(req.body);
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// explicit mapping of all html files in /static
// index page is handled automatically
const login = async (req, res) => {
    res.sendFile(path.join(static_path, "login.html"));
};
const events = async (req, res) => {
    res.sendFile(path.join(static_path, "events.html"));
}
const suggestions = async (req, res) => {
    res.sendFile(path.join(static_path, "suggestions.html"));
}
const account = async (req, res) => {
    res.sendFile(path.join(static_path, "account.html"));
}
const about = async (req, res) => {
    res.sendFile(path.join(static_path, "about.html"));
}
const register = async (req, res) => {
    res.sendFile(path.join(static_path, "register.html"));
}
const dashboard = async (req, res) => {
    res.sendFile(path.join(static_path, "dashboard.html"));
}
const event_page = async (req, res) => {
    res.sendFile(path.join(static_path, "event-page.html"));
}
const news = async (req, res) => {
    res.sendFile(path.join(static_path, "news.html"));
}
const news_page = async (req, res) => {
    // TODO: handle the id and return the actual news id
    res.sendFile(path.join(static_path, "news-page.html"));
}
const suggestion_page = async (req, res) => {
    // TODO: handle the id and return the actual suggestion id
    res.sendFile(path.join(static_path, "suggestion-page.html"));
}
const admin_panel = async (req, res) => {
    res.sendFile(path.join(static_path, "admin-panel.html"));
}
const notFound = async (req, res) => {
    res.status(404).end();
};


module.exports = {
    postSuggestion,
    getSuggestions,
    getSuggestionById,
    getSuggestionsByPopularity,
    getSuggestionsWithCommentCount,
    incrementVoteByID,
    decrementVoteByID,

    postComment,
    getCommentsBySuggestionId,

    postEvent,
    getEvents,
    getEventById,
    changeEventVolunteers,

    login,
    events,
    suggestions,
    account,
    about,
    register,
    dashboard,
    event_page,
    news,
    suggestion_page,
    news_page,
    notFound,
    admin_panel,

    getNews,
    getNewsByLimit,
    getNewsById
};
