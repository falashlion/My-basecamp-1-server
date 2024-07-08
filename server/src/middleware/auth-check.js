const jwt = require('jsonwebtoken');
const { responseHandler } = require('../utils/responseHandler');
const userModel = require('../models/userModel');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userModel.findById(decoded.userId)
            .then(user => {
                if (!user) {
                    return responseHandler(res, 401, "Auth failed", { message: "User not found" });
                }
                req.user = user;  // Attach user object to request
                next();  // Pass control to the next middleware
            })
            .catch(err => {
                return responseHandler(res, 500, "An error occurred", { error: err });
            });
        
    } catch (error) {
        responseHandler(res, 401, "Auth failed", { message: "You are not authorized to access this resource" });
    }
}