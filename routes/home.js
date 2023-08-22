const express = require("express");
const multer = require("multer");
const home = require("../controllers/home");
const validateParameters = require("../middleware/validateParams");
const authenticator = require("../middleware/authenticator");

const router = express.Router();
const upload = multer({storage: multer.memoryStorage()});


// public routes
router.post("/suggestions/new", authenticator, validateParameters({
        title: {type: 'stringWithMaxLength', maxLength: 32},
        description: {type: 'stringWithMaxLength', maxLength: 512},
        urgency_level: {type: 'stringWithMaxLength', maxLength: 16},
        image: {type: 'image'},
    }
), upload.single("image"), home.postSuggestion);

router.post("/suggestions/:id", home.getSuggestionById);

router.get("/suggestions/all", home.getSuggestions);



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
