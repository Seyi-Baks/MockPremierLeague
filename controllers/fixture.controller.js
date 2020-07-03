const FixtureService = require('../services/fixtures.service');
const response = require('../utils/ResponseHandler');
const { statusCodes } = require('../utils/StatusCodes');
const redis_client = require('../config/redis_db');

exports.createFixture = async (req, res) => {
  const fixtureObj = req.body;

  try {
    const createdFixture = await FixtureService.createFixture(fixtureObj);
    return response.sendSuccess(res, 201, createdFixture);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.fetchLeagueFixtures = async (req, res) => {
  const { leagueId } = req.params;

  try {
    const fixtures = await FixtureService.fetchFixturesByLeague(leagueId);
    redis_client.setex('leagueFixtures', 3600, JSON.stringify(fixtures));
    return response.sendSuccess(res, 200, fixtures);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.fetchFixtures = async (req, res) => {
  const status = (req.query = 1 ? statusCodes.completed : statusCodes.pending);

  try {
    const fixtures = await FixtureService.fetchFixtures({ status });
    redis_client.setex('fixtures', 3600, JSON.stringify(fixtures));
    return response.sendSuccess(res, 200, fixtures);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.fetchFixturesFromUrl = async (req, res) => {
  const { match } = req.query;

  try {
    const fixtures = await FixtureService.fetchFixtures({ url: match });
    return response.sendSuccess(res, 200, fixtures);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.fetchFixture = async (req, res) => {
  const { fixtureId } = req.params;

  try {
    const fixture = await FixtureService.fetchFixture(fixtureId);
    redis_client.setex(fixtureId, 3600, JSON.stringify(fixtures));
    return response.sendSuccess(res, 200, fixture);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.updateFixture = async (req, res) => {
  const newFixtureDetails = req.body;
  const { fixtureId } = req.params;

  try {
    const fixture = await FixtureService.updateFixture(
      fixtureId,
      newFixtureDetails
    );
    return response.sendSuccess(res, 200, fixture);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.deleteFixture = async (req, res) => {
  const { fixtureId } = req.params;

  try {
    const fixture = await FixtureService.deleteFixture(fixtureId);
    return response.sendSuccess(res, 200, fixture);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};
