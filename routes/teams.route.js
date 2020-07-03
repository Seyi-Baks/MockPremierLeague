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

const router = express.Router();

router.post('', authMiddleware, permissionMiddleware, createTeam);
router.get('', authMiddleware, fetchTeams);
router.get('/:teamId', authMiddleware, fetchTeam);
router.put('/:teamId', authMiddleware, permissionMiddleware, updateTeam);
router.delete('/:teamId', authMiddleware, permissionMiddleware, deleteTeam);

module.exports = router;
