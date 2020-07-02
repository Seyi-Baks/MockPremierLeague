const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('<h1>Mock Premier League</h1>');
});

app.listen(PORT, () => {
  console.log('App listening on port 3000!');
});
