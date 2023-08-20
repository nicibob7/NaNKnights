const express = require("express");
const router = express.Router();
const home = require("../controllers/home");
const authenticator = require("../middleware/authenticator");

// public routes
router.get("/login", home.login);


// must be logged in
router.get("/secured", authenticator, home.secured);


// keep always last, handles all other unimplemented routes
router.get("*", (req, res) => {
    if(req.method === "HEAD"){
        return res.status(404).end();
    }

    res.redirect("/");
});
router.all("*", home.notFound);

module.exports = router;
