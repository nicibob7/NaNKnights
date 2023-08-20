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

    static getById = async (id) => {
        return await db.query("SELECT * FROM member WHERE id = $1", [id]);
    };

    static async create(data) {
        const {username, password, email, first_name, last_name, phone_number, postal_code} = data;
        const response = await db.query(
            "INSERT INTO member (username, password, email, first_name, last_name, phone_number, postal_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;",
            [username, password, email, first_name, last_name, phone_number, postal_code]
        );
        const newId = response.rows[0].id;
        return await User.getOneById(newId);
    }

    static async getOneById(id) {
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

    static async getOneByUsername(username) {
        const response = await db.query(
            "SELECT * FROM member WHERE username = $1",
            [username]
        );
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }
}

module.exports = User;