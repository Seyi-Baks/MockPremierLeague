//@desc     Get All Teams
//@route    GET /api/v1/teams
//@access   Private
exports.getTeams = (req, res, next) => {
  res.status.json({ success: true, msg: 'Show all teams' });
};

//@desc     Get Team
//@route    GET /api/v1/teams/:id
//@access   Private
exports.getTeam = (req, res, next) => {
  res.status.json({ success: true, msg: 'Team selected' });
};

//@desc     Create Team
//@route    POST /api/v1/teams
//@access   Private
exports.createTeam = (req, res, next) => {
  res.status.json({ success: true, msg: 'Created new team' });
};

//@desc     Update Team
//@route    PUT /api/v1/teams/:id
//@access   Private
exports.updateTeam = (req, res, next) => {
  res.status.json({ success: true, msg: 'Updated team' });
};

//@desc     Delete Team
//@route    DELETE /api/v1/teams/:id
//@access   Private
exports.deleteTeam = (req, res, next) => {
  res.status.json({ success: true, msg: 'Deleted Team' });
};
