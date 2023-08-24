const express = require("express");
const router = express.Router();

const admins = require("../controllers/admins");
const validate = require("../middleware/validateParams");
const adminSecureAuth = require("../middleware/adminSecureAuth");

router.post("/login", validate({
    username: {type: 'stringWithMaxLength', maxLength: 32},
    password: {type: 'stringWithMaxLength', maxLength: 64}
}), admins.login);
router.post("/logout", adminSecureAuth, admins.logout);
router.post("/news", adminSecureAuth, validate({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    type: {type: 'stringWithMaxLength', maxLength: 32},
    image: {type: 'image'},
}), admins.postNews);
router.post("/suggestion", adminSecureAuth, validate({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    type: {type: 'stringWithMaxLength', maxLength: 32},
    image: {type: 'image'},
}), admins.postSuggestion);
router.post("/ping", adminSecureAuth, admins.ping);
module.exports = router;