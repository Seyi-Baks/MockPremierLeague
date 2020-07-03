const League = require('../models/league.model');
const Team = require('../models/teams.model');

exports.createLeague = async (league) => {
  try {
    const leagueDetails = await League.findOne({ name: league.name });
    if (leagueDetails) {
      throw new Error('League already exists');
    }

    const createdLeague = await League.create(league);
    return createdLeague;
  } catch (error) {
    throw new Error(error);
  }
};

exports.fetchLeagues = async () => {
  try {
    const leagues = await League.find().sort({ name: 1 });
    return leagues;
  } catch (error) {
    throw new Error(error);
  }
};

exports.fetchLeague = async (leagueId) => {
  try {
    const league = await League.findById(leagueId);

    if (!league) {
      throw new Error('League does not exist');
    }

    return league;
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateLeague = async (leagueId, league) => {
  try {
    const updatedLeague = League.findByIdAndUpdate({ _id: leagueId }, league, {
      new: true,
      runValidators: true,
    });

    if (!updatedLeague) {
      throw new Error('League does not exist');
    }

    return updatedLeague;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteLeague = async (leagueID) => {
  try {
    const league = await League.findOneAndDelete(leagueID);
    if (!league) {
      throw new Error('League does not exist');
    }

    return league;
  } catch (error) {
    throw new Error(error);
  }
};

exports.fetchTeams = async (leagueId) => {
  try {
    const teams = await Team.find({ league: leagueId });
    return teams;
  } catch (error) {
    throw new Error(error);
  }
};
