const db = require("../db/db");

class CommunityEvent {

    constructor({title, description, date_posted, posted_by, location, date}) {
        this.title = title;
        this.description = description;
        this.date_posted = date_posted;
        this.posted_by = posted_by;
        this.location = location;
        this.date = date;
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
        return db.query(
            "INSERT INTO community_event (title, description, date_posted, posted_by, location, date) VALUES ($1, $2, $3, $4, $5, $6)",
            [data.title, data.description, data.date_posted, data.posted_by, data.location, data.date]);
    }

    static async getAll() {
        const result = await db.query("SELECT * FROM community_event");
        return result.rows;
    }
}

module.exports = CommunityEvent;