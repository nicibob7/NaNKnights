require('dotenv').config({path: './tests/.env.test'});

const db = require("../db/db.js");


// always put db.end() in afterAll at the LAST describe test
describe("Database initial tests", () => {

    it("should connect to database", () => {
        db.query("SELECT 1 + 1;").then((r) => expect(r.rows[0]["?column?"]).toBe(2));
    });

    it("should have Europe/London as timezone", () => {
        db.query("SHOW TIMEZONE;").then((r) => expect(r.rows[0]["TimeZone"]).toBe("Europe/London"));
    });

    it("should have a table called member", () => {
        db.query("SELECT * FROM member;").then((r) => expect(r.rows).toBeTruthy());
    });

    it("should have a table called token", () => {
        db.query("SELECT * FROM token;").then((r) => expect(r.rows).toBeTruthy());
    });

    it("should have a table called administrator", () => {
        db.query("SELECT * FROM administrator;").then((r) => expect(r.rows).toBeTruthy());
    });

    it("should have a table called email_verify", () => {
        db.query("SELECT * FROM email_verify;").then((r) => expect(r.rows).toBeTruthy());
    });

    it("should have a table called suggestion", () => {
        db.query("SELECT * FROM suggestion;").then((r) => expect(r.rows).toBeTruthy());
    });

    it("should have a table called comment", () => {
        db.query("SELECT * FROM comment;").then((r) => expect(r.rows).toBeTruthy());
    });

    it("should have a table called community_event", () => {
        db.query("SELECT * FROM community_event;").then((r) => expect(r.rows).toBeTruthy());
    });
});

describe("Database member table tests", () => {
    beforeAll(async () => {
        try {
            await db.query("INSERT INTO member (username, password, email, first_name, last_name, phone_number, postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7);",
                ["test", "test", "test@test.com", "Tester", "Testing", "+123test", "TES TER"]);
        } catch (e) {
            // skipped
        }

    });

    afterAll(async () => {
        await db.end();
    });

    it("should have a member with id 1", async () => {
        await db.query("SELECT * FROM member WHERE id = 1;").then((r) => expect(r.rows).toBeTruthy());
    });
});