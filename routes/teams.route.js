const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const permissionMiddleware = require('../middleware/permission.middleware');
const {
  createTeam,
  fetchTeams,
  fetchTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/team.controller');

const {
  checkTeamCache,
  checkTeamsCache,
} = require('../middleware/cache/teamCache.middleware');

const router = express.Router();

router.post('', authMiddleware, permissionMiddleware, createTeam);
router.get('', authMiddleware, checkTeamsCache, fetchTeams);
router.get('/:teamId', authMiddleware, checkTeamCache, fetchTeam);
router.put('/:teamId', authMiddleware, permissionMiddleware, updateTeam);
router.delete('/:teamId', authMiddleware, permissionMiddleware, deleteTeam);

module.exports = router;
