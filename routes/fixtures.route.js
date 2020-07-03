const express = require('express');

const authMiddleware = require('../middleware/auth.middleware');
const permissionMiddleware = require('../middleware/permission.middleware');

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

router.post('/match', authMiddleware, permissionMiddleware, createFixture);
router.get('/matches', authMiddleware, fetchFixtures);
router.get('/:leagueId/matches', authMiddleware, fetchLeagueFixtures);
router.get('/', fetchFixturesFromUrl);
router.get('/match/:fixtureId', authMiddleware, fetchFixture);

router.put(
  '/match/:fixtureId',
  authMiddleware,
  permissionMiddleware,
  updateFixture
);

router.delete(
  '/match/:fixtureId',
  authMiddleware,
  permissionMiddleware,
  deleteFixture
);

module.exports = router;
