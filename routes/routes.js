const express = require('express');
const app = express();

const UserRoute = require('./user.routes');

const API_VERSION = '/api/v1';

app.use(`${API_VERSION}/auth`, UserRoute);

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mock Premier League</h1>');
});

module.exports = app;
