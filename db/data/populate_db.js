require("dotenv").config();

const fs = require("fs");
const db = require("../db");

const sql = fs.readFileSync("./db/data/sample_data.sql").toString();

db.query(sql)
    .then(() => db.end().then(() => console.log("Database populated!")))
    .catch((error) => console.log(error));
