const jwt = require('jsonwebtoken');
const { responseHandler } = require('../utils/responseHandler');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        responseHandler(res, 401, "Auth failed", { message: "You are not authorized to access this resource" });
    }
}