const express = require('express');
const app = express();

const UserRoute = require('./user.routes');
const TeamRoute = require('./teams.route');
const LeagueRoute = require('./league.route');

const API_VERSION = '/api/v1';

app.use(`${API_VERSION}/auth`, UserRoute);
app.use(`${API_VERSION}/teams`, TeamRoute);
app.use(`${API_VERSION}/leagues`, LeagueRoute);

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mock Premier League</h1>');
});

module.exports = app;
