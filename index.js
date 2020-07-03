const express = require('express');
const config = require('dotenv');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const routes = require('./routes/routes.js');
const connect = require('./config/database');

const app = express();

//Load environment variables
config.config();

const { PORT = 5000 } = process.env;

//Database connection
connect();

// Enable Cors
app.use(cors());

// Body Parser
app.use(json());

//Rate limit
const limitter = rateLimit({
  windowMS: 10 * 60 * 1000, // 10 mins
  max: 10,
});

app.use(limitter);

app.use(urlencoded({ extended: false }));

//API Routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

module.exports = app;
