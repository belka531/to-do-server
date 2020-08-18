// libraries
const { DataTypes, Sequelize } = require('sequelize');

// connect to the database
const sequelize = Sequelize.connection;

// schema definition
const schema = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, required: true },
  active: { type: DataTypes.BOOLEAN, required: true }
};

const options = {
  paranoid: false,
};

const Element = sequelize.define('element', schema, options);

module.exports = Element;