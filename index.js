require("dotenv").config();

const api = require("./app");
const PORT = process.env.PORT || 8080;
console.log(PORT);
api.listen(PORT, () => {
    console.log("App is listening on port " + PORT);
});

