const {v4: uuidv4} = require("uuid");
const db = require("../db/db");


class Token {
    constructor({token_id, account_username, token, expires_at, created_at}) {
        this.token_id = token_id;
        this.account_username = account_username;
        this.token = token;
        this.expires_at = expires_at;
        this.created_at = created_at;
    }

    static async create(username) {
        const token = uuidv4();
        const response = await db.query("INSERT INTO token (account_username, token) VALUES ($1, $2) RETURNING *;", [username, token]);
        return response.rows[0];
    }

    static async getOneByToken(token) {
        const response = await db.query("SELECT * FROM token WHERE token = $1", [token,]);

        if (response.rows.length !== 1) {
            throw new Error("Unable to locate token.");
        } else {
            return new Token(response.rows[0]);
        }
    }

    static async deleteByToken(token) {
        await db.query("DELETE FROM token WHERE token = $1", [token]);
    }

    static async deleteAllByUsername(username) {
        await db.query("DELETE FROM token WHERE account_username = $1", [username]);
    }

    async isExpired() {
        const response = await db.query("SELECT * FROM token WHERE token = $1", [this.token,]);
        if (response.rows.length !== 1) {
            throw new Error("Unable to locate token.");
        } else {
            const tokenObj = new Token(response.rows[0]);

            const expiry = new Date(tokenObj.expires_at);
            return new Date() > expiry;
        }
    }
}

module.exports = Token;
