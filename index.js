const express = require('express');
const redis = require('redis');
const config = require('dotenv');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const redis_client = require('./config/redis_db');
const session = require('express-session');
const connectRedis = require('connect-redis')(session);

const routes = require('./routes/routes.js');
const connect = require('./config/database');

const RedisClient = redis.createClient();

const app = express();

//Load environment variables
config.config();

const {
  PORT = 5000,
  SESSION_LIFETIME = 1000 * 60 * 60,
  NODE_ENV,
} = process.env;

//Database connection
connect();

//Session
app.use(
  session({
    store: new connectRedis({ client: RedisClient, ttl: 260 }),
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'mysecret',
    cookie: {
      maxAge: SESSION_LIFETIME,
      sameSite: true,
      secure: NODE_ENV === 'production',
    },
  })
);

RedisClient.on('error', (err) => {
  console.log('ERROR ', err);
});

RedisClient.on('ready', () => {
  console.log('Redis is ready');
});

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
