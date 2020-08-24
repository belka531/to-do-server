// libraries
const { Sequelize, DataTypes } = require('sequelize');

const config = require(__dirname + '/../config/db.config.js');

if (process.env.NODE_ENV === "test") {
  var sequelize = new Sequelize('sqlite::memory:');
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);

}
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.elements = require('./element.model.js')(sequelize, DataTypes);

module.exports = db;