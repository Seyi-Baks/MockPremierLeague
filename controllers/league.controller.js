const LeagueService = require('../services/leagues.service');
const response = require('../utils/ResponseHandler');

exports.createLeague = async (req, res) => {
  const leagueObj = req.body;
  try {
    const createdLeague = await LeagueService.createLeague(leagueObj);
    return response.sendSuccess(res, 201, createdLeague);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.fetchLeagues = async (req, res) => {
  try {
    const leagues = await LeagueService.fetchLeagues();
    return response.sendSuccess(res, 200, leagues);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.fetchLeague = async (req, res) => {
  const { leagueId } = req.params;

  try {
    const league = await LeagueService.fetchLeague(leagueId);
    return response.sendSuccess(res, 200, league);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.updateLeague = async (req, res) => {
  const newLeagueDetails = req.body;
  const { leagueId } = req.params;

  try {
    const league = await LeagueService.updateLeague(leagueId, newLeagueDetails);
    return response.sendSuccess(res, 200, league);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.deleteLeague = async (req, res) => {
  const { leagueId } = req.params;

  try {
    const league = await LeagueService.deleteLeague(leagueId);
    return response.sendSuccess(res, 200, league);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.fetchTeams = async (req, res) => {
  const { leagueId } = req.params;
  try {
    const teams = await LeagueService.fetchTeams(leagueId);
    return response.sendSuccess(res, 200, teams);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};
