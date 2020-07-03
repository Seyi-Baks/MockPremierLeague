const express = require('express');
const app = express();
const path = require('path');

const UserRoute = require('./user.routes');
const TeamRoute = require('./teams.route');
const LeagueRoute = require('./league.route');
const FixtureRoute = require('./fixtures.route');

const API_VERSION = '/api/v1';

app.use(`${API_VERSION}/auth`, UserRoute);
app.use(`${API_VERSION}/teams`, TeamRoute);
app.use(`${API_VERSION}/leagues`, LeagueRoute);
app.use(`${API_VERSION}/fixtures`, FixtureRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = app;
