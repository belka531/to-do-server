// libraries
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');

const DATABASE_CONFIG = require('./config/db.config');

// create app
const app = express();

// database config
const connection = new Sequelize(DATABASE_CONFIG.database, DATABASE_CONFIG.username, DATABASE_CONFIG.password, {
  ...DATABASE_CONFIG,
});

Sequelize.connection = connection;
module.exports = connection;

app.use(bodyParser.json());

require('./routes/element.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
