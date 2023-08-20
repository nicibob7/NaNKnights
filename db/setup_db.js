require("dotenv").config();

const fs = require("fs");
const db = require("./db");

const sql = fs.readFileSync("./db/setup.sql").toString();

// If db connection takes longer than 5 seconds, time out
const timeout = setTimeout(() => {
    db.end().then(() => {
        console.log("Database connection timed out!");
        process.exit(1);
    });
}, 5000);

db.query(sql)
    .then(() => {
        clearTimeout(timeout);
        db.end().then(() =>
            console.log(
                "Set-up completed!"
            )
        );
    })
    .catch((error) => {
        clearTimeout(timeout);
        console.log(error);
    });
