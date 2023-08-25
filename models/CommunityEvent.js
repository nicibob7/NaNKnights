const db = require("../db/db");

class CommunityEvent {

    constructor({title, description, date_posted, posted_by, location, date, type, volunteers}) {
        this.title = title;
        this.description = description;
        this.date_posted = date_posted;
        this.posted_by = posted_by;
        this.location = location;
        this.volunteers = volunteers;
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
        const result = await db.query(
            "INSERT INTO community_event (title, description, posted_by, location, date) VALUES ($1, $2, $3, $4, $5)",
            [data.title, data.description, data.posted_by, data.location, data.date]
        );

        return result.rows[0];
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

    static async changeVolunteers(data) {
        // get existing volunteers table
        const response = await db.query(
            "SELECT volunteers FROM community_event WHERE id = $1",
            [data.event_id]
        );

        let volunteers = response.rows[0].volunteers;
        console.log(volunteers)
        // check if user exists
        if (volunteers.includes(data.username)) {
            throw new Error("User already exists in volunteers list.");
        }
        console.log(volunteers)
        volunteers.push(data.username);

        return await db.query(
            "UPDATE community_event SET volunteers = $1 WHERE id = $2 RETURNING *",
            [volunteers, data.event_id]
        );
    }
}

module.exports = CommunityEvent;
