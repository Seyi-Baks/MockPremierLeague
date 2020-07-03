const express = require('express');
const {
  createFixture,
  fetchLeagueFixtures,
  fetchFixtures,
  fetchFixturesFromUrl,
  fetchFixture,
  updateFixture,
  deleteFixture,
} = require('../controllers/fixture.controller');

const router = express.Router();

router.post('/match', createFixture);
router.get('/matches', fetchFixtures);
router.get('/:leagueId/matches', fetchLeagueFixtures);
router.get('/', fetchFixturesFromUrl);
router.get('/match/:fixtureId', fetchFixture);

router.put('/match/:fixtureId', updateFixture);

router.delete('/match/:fixtureId', deleteFixture);

module.exports = router;
