const express = require("express");
const cron = require('node-cron');

const app = express();

const db = require("./db/db");
const filter = require("./middleware/filter");
const users = require("./routes/users");
const home = require("./routes/home");
const hardenedSecurityConfig = require("./security/hardenedSecurityConfig");



// parse as json
app.use(express.json());
// check if json is valid
/* istanbul ignore next */
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Handle JSON parsing error
        return res.status(400).json({error: 'Invalid JSON format.'});
    }
    // Forward other errors to the default Express error handler
    next(err);
});


// set static files
app.use(express.static("static",
    {maxAge: 1800000,}));
// filter out direct requests to *.(html,htm) files
app.use(filter);
// routes mapping
app.use("/users", users);
app.use("/", home);// should always be last

/* istanbul ignore next */
if (process.env.ENV === "production") {
    // Schedule the token delete task to run every 1 minute
    cron.schedule('*/30 * * * *', () => {
        // delete expired session tokens
        db.query("SELECT delete_expired_session_tokens();")
            .then(() => console.log("Expired tokens deleted."));

        // delete expired email tokens
        db.query("SELECT delete_expired_email_tokens();")
            .then(() => console.log("Expired email tokens deleted."));
    });

    // apply various security patches
    module.exports = hardenedSecurityConfig(app);
} else {
    module.exports = app;
}
