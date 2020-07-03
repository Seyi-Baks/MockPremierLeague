const express = require('express');
const redis = require('redis');
const config = require('dotenv');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const redis_client = require('./config/redis_db');
const session = require('express-session');
const connectRedis = require('connect-redis');

const routes = require('./routes/routes.js');
const connect = require('./config/database');

const app = express();

//Load environment variables
config.config();

const {
  PORT = 5000,
  NODE_ENV,
  SESSION_LIFETIME = 1000 * 60 * 60,
  COOKIE_SECRET = 'cookiesecret',
} = process.env;
const RedisStore = connectRedis(session);

//Database connection
connect();

// Redis
redis_client.on('connect', (err, response) => {
  'use strict';
  console.log('Connected to Redis database');
});

//Session
app.use(
  session({
    store: new RedisStore({ client: redis_client }),
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: true,
      secure: NODE_ENV === 'production',
    },
  })
);

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
