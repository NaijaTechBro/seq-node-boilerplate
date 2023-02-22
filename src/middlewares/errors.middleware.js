const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../lib/logger');
const ApiError = require('../lib/apiError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  const { statusCode, message } = err;

  const response = {
    errorCode: statusCode,
    message,
  };

  if (config.env === 'development') response.stack = err.stack;

  res.status(statusCode).json(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
