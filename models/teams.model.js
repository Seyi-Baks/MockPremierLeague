const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a team name'],
  },
  code: {
    type: String,
    require: [true, 'Please add a team code'],
    unique: false,
    trim: true,
  },
  key: {
    type: String,
    require: [true, 'Please add a team key'],
    unique: false,
    trim: true,
  },
  stadium: {
    type: String,
    require: [true, 'Please add a stadium'],
  },
  league: {
    type: mongoose.Schema.ObjectId,
    ref: 'League',
    required: true,
  },
});

module.exports = mongoose.model('Team', TeamSchema);
