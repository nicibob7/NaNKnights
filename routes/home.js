const express = require("express");
const home = require("../controllers/home");
const router = express.Router();

/* public endpoints */
// cant have get here, as it will conflict with the get /suggestions/all & /suggestions/:id
router.post("/suggestions/:id", home.getSuggestionById);

router.get("/news/popular", home.getNewsByPopularity)
router.get("/events/date", home.getEventsByPopularity)
router.get("/suggestions/popular", home.getSuggestionsByPopularity)
router.get("/suggestions/all", home.getSuggestions);
router.post("/comments/:id", home.getCommentsBySuggestionId);


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

// keep always last, handles all other unimplemented routes
router.get("*", (req, res) => {
    if(req.method === "HEAD"){
        return res.status(404).end();
    }

    res.redirect("/");
});
router.all("*", home.notFound);

module.exports = router;
