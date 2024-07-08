const responseHandler = (res, status, message, data) => {
    res.status(status).json({
        message: message,
        data
    });
}

module.exports = { responseHandler };