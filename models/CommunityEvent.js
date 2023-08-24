const db = require("../db/db");

class CommunityEvent {

    constructor({title, description, date_posted, posted_by, location, date, type}) {
        this.title = title;
        this.description = description;
        this.date_posted = date_posted;
        this.posted_by = posted_by;
        this.location = location;
        this.date = date;
        this.type = type;
    }

    static async getEventsByDate() {
        const result = await db.query("SELECT * FROM community_event ORDER BY date");
        return result.rows;
    }

    static async getEventsByTitle() {
        const result = await db.query("SELECT * FROM community_event ORDER BY title");
        return result.rows;
    }

    static async create(data) {
        const response = db.query(
            "INSERT INTO community_event (title, description, date_posted, posted_by, location, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [data.title, data.description, data.date_posted, data.posted_by, data.location, data.date]);

        return response.rows[0];
    }

    static async getAll() {
        const result = await db.query("SELECT * FROM community_event");
        return result.rows;
    }

    static async getEventById(id) {
        const result = await db.query("SELECT * FROM community_event WHERE id = $1", [id]);
        return result.rows[0];
    }

    static async delete(id) {
        const result = await db.query("DELETE FROM community_event WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    }

    static async update(data) {
        const response = await db.query(
            "UPDATE community_event SET title = $1, description = $2, posted_by = $3, location = $4, date = $5 WHERE id = $6 RETURNING *",
            [data.title, data.description, data.posted_by, data.location, data.date, data.id]);

        return response.rows[0];
    }
}

module.exports = CommunityEvent;