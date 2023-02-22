/**
 * Main DB Connector
 * https://sequelize.org/docs/v6/getting-started/
 */

const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: config.db.db,
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
