const db = require('../db/db');
const {v4: uuidv4} = require('uuid');
const base_url = require('../security/serverUrl');


class EmailToken {
    //allowed for the params to be decoupled just incase. If not neccesary then the curly braces can be removed.
    constructor({username}) {
        this.username = username;
    }

    static async create(username) {

        const token = uuidv4();

        await db.query('INSERT INTO email_verify (username, token) VALUES ($1, $2) RETURNING *',
            [username, token]);

        // note the missing / at the start of the url
        return base_url + "users/verify/" + token;
    }

    static async getOneByToken(token) {
        const response = await db.query('SELECT * FROM email_verify WHERE token = $1', [token]);
        if (response.rows.length !== 1) {
            throw new Error('Token has been used or expired.');
        }

        return response.rows[0];
    }

    static async deleteByToken(token) {
        await db.query('DELETE FROM email_verify WHERE token = $1', [token]);
    }

    static async deleteByUsername(username) {
        await db.query('DELETE FROM email_verify WHERE username = $1', [username]);
    }
}

module.exports = EmailToken;
