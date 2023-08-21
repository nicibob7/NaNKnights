const express = require("express");
const router = express.Router();
const admins = require("../controllers/admins");
const validate = require("../middleware/validateParams");

router.post("/register", validate({
    username: {type: 'stringWithMaxLength', maxLength: 32},
    password: {type: 'stringWithMaxLength', maxLength: 64}
    }
), admins.register);

router.post("/login", validate({
    username: {type: 'stringWithMaxLength', maxLength: 32},
    password: {type: 'stringWithMaxLength', maxLength: 64}
}), admins.login);

router.post("/logout", admins.logout);

module.exports = router;