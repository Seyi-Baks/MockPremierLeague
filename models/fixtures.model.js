const mongoose = require('mongoose');
const statusCodes = require('../utils/StatusCodes');
const slugify = require('slugify');
const Team = require('./teams.model');

const FixtureSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'Please add a fixture date'],
  },
  time: {
    type: String,
    required: [true, 'Please add a kick-off time'],
  },
  league: {
    type: mongoose.Schema.ObjectId,
    ref: 'League',
    required: true,
  },
  stadium: {
    type: String,
    required: [true, 'Please add a stadium'],
  },
  home_team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: true,
  },
  away_team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    required: true,
  },
  status: {
    type: String,
    enum: [
      statusCodes.pending,
      statusCodes.inprogress,
      statusCodes.pending,
      statusCodes.completed,
      statusCodes.postponed,
    ],
    required: true,
  },
  url: {
    type: String,
  },
  ft_score: {
    type: String,
  },
});
//Create fixture
FixtureSchema.pre('save', async function (next) {
  const homeTeam = await Team.findById({ _id: this.home_team });
  const awayTeam = await Team.findById({ _id: this.away_team });
  this.url = slugify(homeTeam.key + '_' + awayTeam.key, {
    lower: true,
    replacement: '-',
    remove: undefined,
  });
  next();
});
module.exports = mongoose.model('Fixture', FixtureSchema);
