const express = require("express");
const router = express.Router();

const users = require("../controllers/users");
const home = require("../controllers/home");
const authenticator = require("../middleware/authenticator");
const validateParameters = require("../middleware/validateParams");
const captchaValidation = require("../middleware/captchaValidation");

// public routes
router.post("/login", captchaValidation, validateParameters({
    username: {type: 'stringWithMaxLength', maxLength: 32}, password: {type: 'stringWithMaxLength', maxLength: 64},
}), users.login);
router.post("/register", validateParameters({
    username: {type: 'stringWithMaxLength', maxLength: 32},
    password: {type: 'stringWithMaxLength', maxLength: 64},
    email: {type: 'stringWithMaxLength', maxLength: 64}
}), users.register);
router.post("/reset", captchaValidation, validateParameters({
    email: {type: 'stringWithMaxLength', maxLength: 64},
}), users.sendResetPasswordEmail);
router.get("/verify/:emailToken", users.verify);
router.get("/reset/:emailToken", validateParameters({
    password: {type: 'stringWithMaxLength', maxLength: 64},
}), users.resetPassword);

// must be logged in
router.post("/logout", authenticator, users.logout);
router.post("/ping", authenticator, users.loggedInCheck);
router.post("/comment", authenticator, validateParameters({
    comment: {type: 'stringWithMaxLength', maxLength: 128}, suggestion_id: {type: 'integer'},
}), home.postComment);
router.post("/suggestions/new", authenticator, validateParameters({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    urgency_level: {type: 'stringWithMaxLength', maxLength: 16},
    image: {type: 'image'},
}), home.postSuggestion);
router.post("/update", authenticator, validateParameters({
    first_name: {type: 'stringWithMaxLength', maxLength: 32},
    last_name: {type: 'stringWithMaxLength', maxLength: 32},
    phone_number: {type: 'stringWithMaxLength', maxLength: 16},
    postal_code: {type: 'stringWithMaxLength', maxLength: 12},
}), users.updateDetails);
router.post("/events/new", authenticator, validateParameters({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    date: {type: 'date'},
    image: {type: 'image'},
    type: {type: 'stringWithMaxLength', maxLength: 32},
    }), home.postEvent);

module.exports = router;