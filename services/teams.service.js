const Team = require('../models/teams.model');

exports.createTeam = async (team) => {
  const { code } = team;
  try {
    const teamDetails = await Team.findOne({ code });
    if (teamDetails) {
      throw new Error('Team already exists');
    }

    const createdTeam = await Team.create(team);
    return createdTeam;
  } catch (error) {
    throw new Error(error);
  }
};

exports.fetchTeams = async (search) => {
  try {
    const teams = await Team.find(
      search ? { $text: { $search: search } } : null
    )
      .sort({ name: 1 })
      .populate([
        {
          path: 'league',
        },
      ]);

    return teams.map((team) => {
      const { _id, key, name, code, stadium, league } = team;

      return {
        id: _id,
        key,
        name,
        code,
        stadium,
        league: league.name,
      };
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.fetchTeam = async (teamId) => {
  try {
    const team = await Team.findById(teamId).populate([
      {
        path: 'league',
      },
    ]);

    if (!team) {
      throw new Error('Team does not exist');
    }

    const { _id, key, name, code, stadium, league } = team;

    return {
      id: _id,
      key,
      name,
      code,
      stadium,
      league: league.name,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.updateTeam = async (teamId, team) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate({ _id: teamId }, team, {
      new: true,
      runValidators: true,
    }).populate([
      {
        path: 'league',
      },
    ]);

    if (!updatedTeam) {
      throw new Error('Team does not exist');
    }

    const { _id, key, name, code, stadium, league } = updatedTeam;

    return {
      id: _id,
      key,
      name,
      code,
      stadium,
      league: league.name,
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteTeam = async (teamID) => {
  try {
    const team = await Team.findOneAndDelete(teamID).populate([
      {
        path: 'league',
      },
    ]);
    if (!team) {
      throw new Error('Team does not exist');
    }

    return team;
  } catch (error) {
    throw new Error(error);
  }
};
