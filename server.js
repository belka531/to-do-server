// libraries
const express = require('express');
const bodyParser = require('body-parser');

// create app
const app = express();
const db = require('./models');

db.sequelize.sync();

app.use(bodyParser.json());

require('./routes/element.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;