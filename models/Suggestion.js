const db = require("../db/db");

class Suggestion {
    constructor({posted_by, title, description, image, urgency_level}) {
        this.username = posted_by;
        this.title = title;
        this.description = description;
        this.image = image;
        this.urgency_level = urgency_level;
    }

    static async create(data) {
        const suggestion = new Suggestion(data);

        const result = await db.query(
            'INSERT INTO suggestion (posted_by, title, description, image, urgency_level) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [suggestion.username, suggestion.title, suggestion.description, suggestion.image, suggestion.urgency_level]);

        return result.rows[0];
    }

    static async getAllByNotActivated() {
        const result = await db.query('SELECT * FROM suggestion WHERE is_activated = false');
        return result.rows;
    }

    static async getAll() {
        const result = await db.query('SELECT * FROM suggestion');
        // convert image from buffer to base64
        result.rows.forEach((suggestion) => {
            if(!suggestion.image) return;
            suggestion.image = suggestion.image.toString();
        });
        return result.rows;
    }

    static async getSuggestionsByPopularity(){
        const result = await db.query("SELECT * FROM suggestion ORDER BY votes DESC");
        return result.rows;
    }

    static async getById(id) {
        const result = await db.query('SELECT * FROM suggestion WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await db.query('DELETE FROM suggestion WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async update(id, data) {
        const result = await db.query(
            'UPDATE suggestion SET title = $1, description = $2, image = $3, urgency_level = $4 WHERE id = $5 RETURNING *',
            [data.title, data.description, data.image, data.urgency_level, id]
        );
        return result.rows[0];
    }
}

module.exports = Suggestion;
