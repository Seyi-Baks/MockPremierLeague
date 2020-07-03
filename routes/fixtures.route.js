const express = require('express');

const authMiddleware = require('../middleware/auth.middleware');
const permissionMiddleware = require('../middleware/permission.middleware');

const {
  checkFixtureCache,
  checkFixturesCache,
  checkLeagueFixtures,
} = require('../middleware/cache/fixtureCache.middleware');

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
router.get(
  '/:leagueId/matches',
  authMiddleware,
  checkLeagueFixtures,
  fetchLeagueFixtures
);
router.get('/', checkFixturesCache, fetchFixturesFromUrl);
router.get(
  '/match/:fixtureId',
  authMiddleware,
  checkFixtureCache,
  fetchFixture
);

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
