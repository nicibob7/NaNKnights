const db = require("../db/db");

// user is replaced with member in the database
// since user is a reserved word in postgres
class User {
    constructor({username, password, email, first_name, last_name, phone_number, postal_code}) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.postal_code = postal_code;
    }

    static getAllUsers = async () => {
        return await db.query("SELECT * FROM member;");
    };

    static async create(data) {
        const {username, password, email} = data;
        const response = await db.query(
            "INSERT INTO member (username, password, email) VALUES ($1, $2, $3) RETURNING id;",
            [username, password, email]
        );
        const newId = response.rows[0].id;
        return await this.getById(newId);
    }

    static async getById(id) {
        const response = await db.query(
            "SELECT * FROM member WHERE id = $1",
            [id]
        );
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static delete = async (id) => {
        await db.query("DELETE FROM member WHERE id = $1", [id]);

        return await this.getAllUsers();
    };

    static async getByUsername(username) {
        const response = await db.query(
            "SELECT * FROM member WHERE username = $1",
            [username]
        );

        if (response.rows.length !== 1) {
            throw new Error("Unable to locate user.");
        }

        return new User(response.rows[0]);
    }

    // TODO: test this
    static async getOneByEmail(email) {
        const response = await db.query(
            "SELECT * FROM member WHERE email = $1",
            [email]
        );
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    // TODO: test this
    static async getAllNonActivated() {
        return await db.query("SELECT * FROM member WHERE is_activated = false;");
    }

    async isActivated() {
        const response = await db.query(
            "SELECT is_activated FROM member WHERE username = $1",
            [this.username]
        );
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate user.");
        }
        return response.rows[0].is_activated;
    }

    async activate() {
        await db.query(
            "UPDATE member SET is_activated = true WHERE username = $1",
            [this.username]
        );
    }

    async updateBasicDetails(data) {
        const {username, first_name, last_name, phone_number, postal_code} = data;
        const response = await db.query(
            "UPDATE member SET first_name = $1, last_name = $2, phone_number = $3, postal_code = $4 WHERE username = $5 RETURNING *;",
            [first_name, last_name, phone_number, postal_code, this.username]
        );
        return new User(response.rows[0]);
    }

    async userDetailsCheck() {
        // check if either first_name, last_name, phone_number, or postal_code is null
        const response = await db.query(
            'SELECT\n' +
            '  CASE\n' +
            '    WHEN first_name IS NULL OR last_name IS NULL OR phone_number IS NULL OR post_code IS NULL\n' +
            '    THEN false\n' +
            '    ELSE true\n' +
            '  END AS result\n' +
            'FROM users\n' +
            'WHERE username = \'$1\';',
            [this.username]);

        return response.rows[0].result;
    }
}

module.exports = User;