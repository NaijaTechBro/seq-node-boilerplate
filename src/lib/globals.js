/**
 * Globals can be very dangerous!
 * Always prefix the function with something you know for sure is not used in ALL Node and JS scopes
 *
 * Use this formulate default responses across the board
 * Use this for fast helpers across all scopes
 *
 */

const httpStatus = require('http-status');
const logger = require('../lib/logger');
const ApiError = require('../lib/apiError');

/**
 * GX Logger using winston
 * @param type
 * @param message
 */
global.gxLogger = function (type = 'info', message) {
  logger[type](message);
};

/**
 * Logger/Winston Constant Types
 * @type {{ERROR: string, INFO: string, WARNING: string}}
 */
global.gxLoggerType = {
  INFO: 'info',
  ERROR: 'error',
  WARNING: 'warning',
};

/**
 * Instantiate a new ApiError class
 * @param statusCode
 * @param message
 */
global.gxApiError = function (statusCode, message) {
  throw new ApiError(statusCode, message);
};

/**
 * Instantiate a new ApiError class
 * @description Use this to formulate standardized responses
 * @param message
 */
global.gxApiErrorNotFound = function (message) {
  throw new ApiError(httpStatus.NOT_FOUND, message);
};

/**
 * GX Success Response - 200/OK
 * @param res
 * @param data
 */
global.gxSuccess = function (res, data = null) {
  const object = {
    success: true,
    data: data || null,
  };

  res.status(httpStatus.OK).send(object);
};

/**
 * GX Sucess Response - 201/CREATED
 * @param res
 * @param data
 */
global.gxCreated = function (res, data = null) {
  const object = {
    success: true,
    data: data || null,
  };

  res.status(httpStatus.CREATED).send(object);
};
