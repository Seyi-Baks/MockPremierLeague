const TeamService = require('../services/teams.service');
const response = require('../utils/ResponseHandler');

exports.createTeam = async (req, res) => {
  const team = req.body;
  try {
    const createdTeam = await TeamService.createTeam(team);
    return response.sendSuccess(res, 201, createdTeam);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.fetchTeams = async (req, res) => {
  const { search } = req.query;
  try {
    const teams = await TeamService.fetchTeams(search);

    return response.sendSuccess(res, 200, teams);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.fetchTeam = async (req, res) => {
  const { teamId } = req.params;

  try {
    const team = await TeamService.fetchTeam(teamId);

    return response.sendSuccess(res, 200, team);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.updateTeam = async (req, res) => {
  const newTeamDetails = req.body;
  const { teamId } = req.params;

  try {
    const team = await TeamService.updateTeam(teamId, newTeamDetails);
    return response.sendSuccess(res, 200, team);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.deleteTeam = async (req, res) => {
  const { teamId } = req.params;

  try {
    const team = await TeamService.deleteTeam(teamId);
    return response.sendSuccess(res, 200, team);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};
