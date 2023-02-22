/**
 * Same User Model
 * https://sequelize.org/docs/v6/core-concepts/model-instances/
 */

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
