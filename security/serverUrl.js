const os = require('os');

// Get the hostname
const hostname = os.hostname();

// Determine the protocol (http or https)
const protocol = process.env.ENV === 'production' ? 'https' : 'http';

// Determine the port (fallback to 8080)
const port = process.env.PORT || 8080;

// Construct the full URL
const serverUrl = new URL(`${protocol}://${hostname}:${port}`);

module.exports = serverUrl;