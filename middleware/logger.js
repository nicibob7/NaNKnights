module.exports = async () => {
    function logRoutes(req, res, next) {
        console.log(req.method, req.originalUrl);
        next();
    }
};