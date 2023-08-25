const express = require("express");
const router = express.Router();

const admins = require("../controllers/admins");
const validate = require("../middleware/validateParams");
const adminSecureAuth = require("../middleware/adminSecureAuth");

// session management
router.post("/login", validate({
    username: {type: 'stringWithMaxLength', maxLength: 32},
    password: {type: 'stringWithMaxLength', maxLength: 64}
}), admins.login);
router.post("/logout", adminSecureAuth, admins.logout);

// data management
router.post("/news", adminSecureAuth, validate({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    type: {type: 'stringWithMaxLength', maxLength: 32},
    image: {type: 'image'},
}), admins.postNews);
router.post("/news/:id", adminSecureAuth, validate({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    type: {type: 'stringWithMaxLength', maxLength: 32},
    image: {type: 'image'},
}), admins.updateNews);
router.post("/news/delete/:id", adminSecureAuth, admins.deleteNews);

router.post("/event", adminSecureAuth, validate({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    date: {type: 'stringWithMaxLength', maxLength: 32},
    location: {type: 'stringWithMaxLength', maxLength: 32},
    type: {type: 'stringWithMaxLength', maxLength: 32},
}), admins.postCommunityEvent);
router.post("/event/:id", adminSecureAuth, validate({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    date: {type: 'stringWithMaxLength', maxLength: 32},
    location: {type: 'stringWithMaxLength', maxLength: 32},
    type: {type: 'stringWithMaxLength', maxLength: 32},
}), admins.updateCommunityEvent);
router.post("/event/delete/:id", adminSecureAuth, admins.deleteCommunityEvent);

router.post("/suggestion", adminSecureAuth, validate({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    type: {type: 'stringWithMaxLength', maxLength: 32},
    image: {type: 'image'},
}), admins.postSuggestion);
router.post("/suggestion/:id", adminSecureAuth, validate({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    type: {type: 'stringWithMaxLength', maxLength: 32},
    image: {type: 'image'},
}), admins.updateSuggestion);
router.post("/suggestion/delete/:id", adminSecureAuth, admins.deleteSuggestion);

router.post("/comment", adminSecureAuth, validate({
    title: {type: 'stringWithMaxLength', maxLength: 32},
    description: {type: 'stringWithMaxLength', maxLength: 512},
    type: {type: 'stringWithMaxLength', maxLength: 32},
    image: {type: 'image'},
}), admins.postComment);
router.post("/pending", adminSecureAuth, admins.getPendingSuggestions);
router.post("/comment/delete/:id", adminSecureAuth, admins.deleteComment);

// server management
router.post("/ping", adminSecureAuth, admins.ping);
router.post("/health", adminSecureAuth, admins.getServerInfo);
router.post("/total_users", adminSecureAuth, admins.getTotalUserCount);
router.post("/posts_hour", adminSecureAuth, admins.getPostCountLastHour);
router.post("/non_reg_users", adminSecureAuth, admins.getNonRegisteredUsers);

module.exports = router;