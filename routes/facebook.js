const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/User');
const Token = require('../models/Token');

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const BASE_URL = require('../security/serverUrl');


passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, function (accessToken, refreshToken, profile, done) {
    done(null, {profile, accessToken});
}));

// Route to start the Facebook OAuth2 authentication
router.get('/auth/facebook', passport.authenticate('facebook'));

// Callback route after Facebook authentication
router.get('/auth/facebook/callback', passport.authenticate('facebook', {session: false}), async (req, res) => {
    const profile = req.user.profile;
    const accessToken = req.user.accessToken;

    // find user from db, usernames are saved in format: facebookId_facebook
    // to avoid conflicts with other auth providers like google

    const foundUser = await User.getByUsernameOrEmail(profile.id + "_facebook", "facebook_managed");

    // user exists, log them in
    if (foundUser !== "Unable to locate user.") {
        // delete all existing session tokens for this user
        await Token.deleteAllByUsername(foundUser.username);

        // create new session token
        const token = await Token.create(foundUser.username);

        return await setAuthCookie(res, token);
    } else {
        // setup new user vars
        const email = "facebook_managed";
        const username = profile.id + "_facebook";
        const password = accessToken;

        // create the new user
        const newUser = await User.create({username, password, email});

        // activate the user, since we don't need to verify their email
        await newUser.activate(newUser.username);

        // log user in
        const token = await Token.create(newUser.username);

        return await setAuthCookie(res, token);
    }
});

const setAuthCookie = async (res, token) => {
    res
        .cookie("authorization", await token.token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            domain: "localhost",
            path: "/",
            priority: "high",
            maxAge: 30 * 60 * 1000, // 30 minutes maxAge as defined in database table
        }).redirect("http://localhost:8080/")
};

module.exports = router;