const db = require("../db/db");

class Admin {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static async create(data) {
        const {username, password} = data;
        const response = await db.query(
            "INSERT INTO administrator (username, password) VALUES ($1, $2) RETURNING id;",
            [username, password]
        );
        const newId = response.rows[0].id;
        return await this.getById(newId);
    }

    static async getById(id) {
        const response = await db.query(
            "SELECT * FROM administrator WHERE id = $1",
            [id]
        );
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate user.");
        }
        return new Admin(response.rows[0]);
    }

    static async getByUsername(username) {
        const response = await db.query(
            "SELECT * FROM administrator WHERE username = $1",
            [username]
        );
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate user.");
        }
        return new Admin(response.rows[0]);
    }


}

module.exports = Admin;