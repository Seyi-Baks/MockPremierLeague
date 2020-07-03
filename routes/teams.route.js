const express = require('express');
const {
  createTeam,
  fetchTeams,
  fetchTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/team.controller');

const router = express.Router();

router.post('', createTeam);
router.get('', fetchTeams);
router.get('/:teamId', fetchTeam);
router.put('/:teamId', updateTeam);
router.delete('/:teamId', deleteTeam);

module.exports = router;
