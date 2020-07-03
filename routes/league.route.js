const express = require('express');

const authMiddleware = require('../middleware/auth.middleware');
const permissionMiddleware = require('../middleware/permission.middleware');

const {
  createLeague,
  fetchLeagues,
  fetchLeague,
  updateLeague,
  deleteLeague,
  fetchTeams,
} = require('../controllers/league.controller');

const router = express.Router();

router.post('', authMiddleware, permissionMiddleware, createLeague);
router.get('', authMiddleware, fetchLeagues);
router.get('/:leagueId', authMiddleware, fetchLeague);
router.put('/:leagueId', authMiddleware, permissionMiddleware, updateLeague);
router.delete('/:leagueId', authMiddleware, permissionMiddleware, deleteLeague);
router.get('/:leagueId/teams', authMiddleware, fetchTeams);

module.exports = router;
