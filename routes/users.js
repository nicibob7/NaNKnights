const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

const authenticator = require("../middleware/authenticator");
const validateParameters = require("../middleware/validateParams");

// public routes
router.post("/register", validateParameters({
    username: { type: 'stringWithMaxLength', maxLength: 32 },
    password: { type: 'stringWithMaxLength', maxLength: 64 },
    email: { type: 'stringWithMaxLength', maxLength: 64 },
    first_name: { type: 'stringWithMaxLength', maxLength: 16 },
    last_name: { type: 'stringWithMaxLength', maxLength: 16 },
    phone_number: { type: 'stringWithMaxLength', maxLength: 16 },
    postal_code: { type: 'stringWithMaxLength', maxLength: 12 },
}), users.register);

router.post("/login", validateParameters({
    username: { type: 'stringWithMaxLength', maxLength: 32 },
    password: { type: 'stringWithMaxLength', maxLength: 64 },
}), users.login);

// must be logged in
router.post("/logout", authenticator, users.logout);
router.post("/ping", authenticator, users.loggedInCheck);

module.exports = router;