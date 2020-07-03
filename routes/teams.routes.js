const express = require('express');
const {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/teams.controller');

const router = express.Router();

router.get('/', getTeams);

router.get('/:id', getTeam);

router.post('/', createTeam);

router.put('/:id', updateTeam);

router.delete('/:id', deleteTeam);

module.exports = router;
