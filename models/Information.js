const db = require("../db/db");
// information/news model
class Information {
    constructor({title, description, type, image, posted_by}) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.image = image;
        this.posted_by = posted_by;
    }

    static async create(data) {
        const information = new Information(data);
        const result = await db.query(
            'INSERT INTO information (title, description, type, image, posted_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [information.title, information.description, information.type, information.image, information.posted_by]);

        // no need to return bytearray or base64 string
        result.rows[0].image = (data.image.length / 1024).toFixed(2) + " KB image file";
        return result.rows[0];
    }

    static async getAll() {
        const result = await db.query('SELECT * FROM information');
        return result.rows;
    }

    static async getByPopularity() {
        const result = await db.query('SELECT * FROM information ORDER BY popularity DESC');
        return result.rows;
    }
}

module.exports = Information;