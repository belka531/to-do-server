// libraries
const { Sequelize } = require('sequelize');

// models
const Element = require('./element.model');

// connect to the database
const sequelize = Sequelize.connection;

// relationships:

// create tables if non-existent
sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = {
  Element,
  sequelize,
};
