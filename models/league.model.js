const mongoose = require('mongoose');

const LeagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a league name'],
  },
});

module.exports = mongoose.model('League', LeagueSchema);
