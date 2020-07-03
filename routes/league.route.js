const express = require('express');
const {
  createLeague,
  fetchLeagues,
  fetchLeague,
  updateLeague,
  deleteLeague,
  fetchTeams,
} = require('../controllers/league.controller');

const router = express.Router();

router.post('', createLeague);
router.get('', fetchLeagues);
router.get('/:leagueId', fetchLeague);
router.put('/:leagueId', updateLeague);
router.delete('/:leagueId', deleteLeague);
router.get('/:leagueId/teams', fetchTeams);

module.exports = router;
