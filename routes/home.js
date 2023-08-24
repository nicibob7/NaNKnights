const express = require("express");
const home = require("../controllers/home");
const router = express.Router();

const validateParameters = require("../middleware/validateParams");
const userType = require("../middleware/userType");

/* public endpoints */
// cant have get in this one, as it will conflict with the get /suggestions/all & /suggestions/:id
router.post("/suggestions", validateParameters({
    id: {type: 'int'},
}), home.getSuggestionById);
router.get("/news/all", home.getNews);
router.get("/news/top/:id", home.getNewsByLimit);

router.get("/suggestions/popular", home.getSuggestionsByPopularity);
router.get("/suggestions/all", home.getSuggestions);

router.get("/events/all", home.getEvents);

router.get("/comments/:id", home.getCommentsBySuggestionId);

// endpoint to html routes
router.get("/login", home.login);
router.get("/events", home.events);
router.get("/suggestions", home.suggestions);
router.get("/account", home.account);
router.get("/about", home.about);
router.get("/register", home.register);
router.get("/dashboard", home.dashboard);
router.get("/event-page", home.event_page);
router.get("/news", home.news);
router.get("/suggestions/:id", home.suggestion_page);
router.get("/news/:id", home.news_page);

router.post("/account_type", userType);

// keep always last, handles all other unimplemented routes
router.get("*", (req, res) => {
    if (req.method === "HEAD") {
        return res.status(404).end();
    }

    res.redirect("/");
});
router.all("*", );

module.exports = router;
