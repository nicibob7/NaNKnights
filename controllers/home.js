const path = require("path");
const static_path = path.join(__dirname, "../static");

// explicit mapping of all html files in /static
// index page is handled automatically

const login = async (req, res) => {
    res.sendFile(path.join(static_path, "login.html"));
};

const secured = async (req, res) => {
    res.sendFile(path.join(static_path, "secure.html"));
};

const notFound = async (req, res) => {
    res.status(404).end();
};

module.exports = {login, notFound, secured};
