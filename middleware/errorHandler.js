const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(`${err.message} - ${req.method} ${req.url}`);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;
