const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');
const Token = require('../models/Token');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, {profile, accessToken});
}));

// Route to start the Google OAuth2 authentication
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// Callback route after Google authentication
router.get('/auth/google/callback', passport.authenticate('google', {
    scope: ['profile', 'email'], session: false
}), async (req, res) => {
    const profile = req.user.profile;
    const accessToken = req.user.accessToken;

    // find user from db, usernames are saved in format: googleId_google
    // to avoid conflicts with other auth providers like google
    const foundUser = await User.getByUsernameOrEmail(profile.id + "_google");

    // user exists, log them in
    if (foundUser !== "Unable to locate user.") {
        // delete all existing session tokens for this user
        await Token.deleteAllByUsername(foundUser.username);

        // create new session token
        const token = await Token.create(foundUser.username);

        return await setAuthCookie(res, token);
    } else {
        // setup new user vars
        const email = profile.emails[0].value;
        const username = profile.id + "_google";
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