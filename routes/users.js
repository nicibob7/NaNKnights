const express = require("express");
const router = express.Router();
const multer = require("multer");

const users = require("../controllers/users");
const authenticator = require("../middleware/authenticator");
const validateParameters = require("../middleware/validateParams");

const upload = multer({storage: multer.memoryStorage()});

// public routes
router.post("/register", validateParameters({
    username: {type: 'stringWithMaxLength', maxLength: 32},
    password: {type: 'stringWithMaxLength', maxLength: 64},
    email: {type: 'stringWithMaxLength', maxLength: 64},
    first_name: {type: 'stringWithMaxLength', maxLength: 16},
    last_name: {type: 'stringWithMaxLength', maxLength: 16},
    phone_number: {type: 'stringWithMaxLength', maxLength: 16},
    postal_code: {type: 'stringWithMaxLength', maxLength: 12},
}), users.register);

router.post("/login", validateParameters({
    username: {type: 'stringWithMaxLength', maxLength: 32},
    password: {type: 'stringWithMaxLength', maxLength: 64},
}), users.login);

router.get("/verify/:emailToken", users.verify);


// must be logged in
router.post("/logout", authenticator, users.logout);
router.post("/ping", authenticator, users.loggedInCheck);
router.post("/suggestion", authenticator, validateParameters({
        title: {type: 'stringWithMaxLength', maxLength: 32},
        description: {type: 'stringWithMaxLength', maxLength: 512},
        urgency_level: {type: 'stringWithMaxLength', maxLength: 16},
    }
), upload.single("image"), users.postSuggestion);

module.exports = router;