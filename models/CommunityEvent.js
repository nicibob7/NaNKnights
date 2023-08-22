const db = require("../db/db");

class CommunityEvent {
    
    constructor({ title, description, date_posted, posted_by, location, date}) {
        this.title = title;
        this.description = description;
        this.date_posted = date_posted;
        this.posted_by = posted_by;
        this.location = location;
        this.date = date;
    }

    static async getEventsByPopularity(){
        const result = await db.query("SELECT * FROM community_event ORDER BY date");
        return result.rows;
    }

}

module.exports = CommunityEvent;