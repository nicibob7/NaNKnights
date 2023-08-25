const express = require("express");

const router = express.Router();

const home = require("../controllers/home");
const validateUrlParams = require("../middleware/validateUrlParams");
const userType = require("../middleware/userType");

/* public endpoints */
// cant have get in this one, as it will conflict with the get /suggestions/all & /suggestions/:id
router.get("/suggestion/:id", validateUrlParams("int"), home.getSuggestionById);
router.get("/news/all", home.getNews);
router.get("/news/top/:id", validateUrlParams("int"), home.getNewsByLimit);
router.get("/news/:id", home.getNewsById);

router.get("/suggestions/popular", home.getSuggestionsByPopularity);
router.get("/suggestions/all", home.getSuggestionsWithCommentCount);

router.get("/events/all", home.getEvents);
router.get("/event/:id", home.getEventById);

router.get("/comment/:id", validateUrlParams("int"), home.getCommentsBySuggestionId);

// endpoint to html routes
router.get("/login", home.login);
router.get("/events", home.events);
router.get("/suggestions", home.suggestions);
router.get("/account", home.account);
router.get("/about", home.about);
router.get("/register", home.register);
router.get("/dashboard", home.dashboard);
router.get("/event-page/:id", home.event_page);
router.get("/admin-panel", home.admin_panel);
router.get("/news", home.news);
router.get("/suggestions/:id", home.suggestion_page);
router.get("/news-page/:id", home.news_page);

router.post("/account_type", userType);

// keep always last, handles all other unimplemented routes
router.get("*", (req, res) => {
    if (req.method === "HEAD") {
        return res.status(404).end();
    }

    res.redirect("/");
});
router.all("*",);

module.exports = router;
