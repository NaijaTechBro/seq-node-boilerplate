const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const httpStatus = require('http-status');
const cors = require('cors');
const ApiError = require('./lib/apiError');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/errors.middleware');
const expressWinston = require('express-winston');
const winston = require('winston');

const app = express();

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

app.use(helmet()); //helmet initiated with default guards
app.use(cors()); //CORS enabled for all routes

//#todo app.use(securityMiddleware)

//Load all routes
app.use(routes);

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
  })
);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, `${req.method} - ${req.originalUrl} was not found.`));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
