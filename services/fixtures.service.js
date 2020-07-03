const Fixture = require('../models/fixtures.model');
const Team = require('../models/teams.model');
const statusCodes = require('../utils/StatusCodes');

exports.createFixture = async (fixtureDetails) => {
  const { APP_URL } = process.env;
  try {
    const fixture = await Fixture.findOne({
      home_team: fixtureDetails.home_team,
      away_team: fixtureDetails.away_team,
      league: fixtureDetails.league,
    });

    if (fixture && fixture.status !== statusCodes.postponed) {
      throw new Error('Fixture already exists');
    }

    fixtureDetails.status = statusCodes.pending;
    fixtureDetails.ft_score = null;

    if (!fixtureDetails.stadium) {
      const team = await Team.findOne({ _id: fixtureDetails.home_team });
      fixtureDetails.stadium = team.stadium;
    }

    let createdFixture = await Fixture.create(fixtureDetails);

    const {
      date,
      time,
      league,
      home_team,
      away_team,
      status,
      url,
      stadium,
    } = await createdFixture
      .populate([
        {
          path: 'home_team',
          select: 'name code',
        },
        {
          path: 'away_team',
          select: 'name code',
        },
        {
          path: 'league',
        },
      ])
      .execPopulate();

    return {
      date,
      time,
      league: league.name,
      home_team: home_team.name,
      home_team_code: home_team.code,
      away_team: away_team.name,
      away_team_code: away_team.code,
      url: APP_URL + url,
      status,
      stadium,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.fetchFixturesByLeague = async (leagueId) => {
  try {
    const fixtures = await Fixture.find({ league: leagueId }).populate([
      {
        path: 'home_team',
        select: 'name code',
      },
      {
        path: 'away_team',
        select: 'name code',
      },
      {
        path: 'league',
      },
    ]);

    console.log('GOT HERE');

    return fixtures.map((fixture) => {
      const {
        _id,
        date,
        time,
        league,
        home_team,
        away_team,
        status,
        url,
        stadium,
      } = fixture;

      return {
        id: _id,
        date,
        time,
        league: league.name,
        home_team: home_team.name,
        home_team_code: home_team.code,
        away_team: away_team.name,
        away_team_code: away_team.code,
        status,
        url: APP_URL + url,
        stadium,
      };
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.fetchFixtures = async (fetch) => {
  const { APP_URL } = process.env;
  try {
    const fixtures = await Fixture.find(fetch).populate([
      {
        path: 'home_team',
        select: 'name code',
      },
      {
        path: 'away_team',
        select: 'name code',
      },
      {
        path: 'league',
      },
    ]);

    return fixtures.map((fixture) => {
      const {
        _id,
        date,
        time,
        league,
        home_team,
        away_team,
        status,
        url,
        stadium,
      } = fixture;

      return {
        id: _id,
        date,
        time,
        league: league.name,
        home_team: home_team.name,
        home_team_code: home_team.code,
        away_team: away_team.name,
        away_team_code: away_team.code,
        status,
        url: APP_URL + url,
        stadium,
      };
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.fetchFixture = async (fixtureId) => {
  try {
    const fixture = await Fixture.findById(fixtureId).populate([
      {
        path: 'home_team',
        select: 'name code',
      },
      {
        path: 'away_team',
        select: 'name code',
      },
      {
        path: 'league',
      },
    ]);

    if (!fixture) {
      throw new Error('Fixture does not exist');
    }

    const {
      date,
      time,
      league,
      home_team,
      away_team,
      status,
      url,
      stadium,
    } = fixture;

    return {
      date,
      time,
      league: league.name,
      home_team: home_team.name,
      home_team_code: home_team.code,
      away_team: away_team.name,
      away_team_code: away_team.code,
      status,
      url: APP_URL + url,
      stadium,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateFixture = async (fixtureId, fixture) => {
  try {
    const updatedFixture = await Fixture.findByIdAndUpdate(
      { _id: fixtureId },
      fixture,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFixture) {
      throw new Error('Fixture does not exist');
    }

    return updatedFixture;
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteFixture = async (fixtureID) => {
  try {
    const fixture = await Fixture.findOneAndDelete(fixtureID);
    if (!fixture) {
      throw new Error('Fixture does not exist');
    }
    fixture.status = statusCodes.deleted;
    return fixture;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getTeamFixtures = async (teamCode) => {
  console.log(teamCode);
  try {
    const fixtures = await Fixture.find(teamCode).populate([
      {
        path: 'home_team',
        select: 'name code',
      },
      {
        path: 'away_team',
        select: 'name code',
      },
      {
        path: 'league',
      },
    ]);

    return fixtures.map((fixture) => {
      const {
        _id,
        date,
        time,
        league,
        home_team,
        away_team,
        status,
        url,
        stadium,
      } = fixture;
      return {
        id: _id,
        date,
        time,
        league: league.name,
        home_team: home_team.name,
        home_team_code: home_team.code,
        away_team: away_team.name,
        away_team_code: away_team.code,
        url: APP_URL + url,
        status,
        stadium,
      };
    });
  } catch (error) {
    throw new Error(error);
  }
};
