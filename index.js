const express = require('express');
const config = require('dotenv');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');

const teams = require('./routes/teams.routes.js');

const app = express();

const { PORT = 5000 } = process.env;

//Load environment variables
config.config();

//routes
app.use('/api/v1/teams', teams);

// Enable Cors
app.use(cors());

// Body Parser
app.use(json());

app.use(urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mock Premier League</h1>');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
