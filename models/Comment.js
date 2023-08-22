const db = require("../db/db");

class Comment {
    constructor({posted_by, suggestion_id, comment}) {
        this.posted_by = posted_by;
        this.suggestion_id = suggestion_id;
        this.comment = comment;
    }

    static async create(data) {
        const comment = new Comment(data);

        const result = await db.query(
            'INSERT INTO comment (posted_by, suggestion_id, comment) VALUES ($1, $2, $3) RETURNING *',
            [comment.posted_by, comment.suggestion_id, comment.comment]);

        return result.rows[0];
    }

    static async getAllBySuggestionId(id) {
        const result = await db.query('SELECT * FROM comment WHERE suggestion_id = $1', [id]);
        return result.rows;
    }

}

module.exports = Comment;