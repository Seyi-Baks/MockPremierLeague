const redis_client = require('../../config/redis_db');
const response = require('../../utils/ResponseHandler');

//Middleware Function to Check Cache
exports.checkFixtureCache = (req, res, next) => {
  const { fixtureId } = req.params;

  redis_client.get(fixtureId, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      return response.sendSuccess(res, 200, JSON.parse(data));
    } else {
      //proceed to next middleware function
      next();
    }
  });
};

exports.checkFixturesCache = (req, res, next) => {
  redis_client.get('fixtures', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      return response.sendSuccess(res, 200, JSON.parse(data));
    } else {
      //proceed to next middleware function
      next();
    }
  });
};

exports.checkLeagueFixtures = (req, res, next) => {
  redis_client.get('leagueFixtures', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      return response.sendSuccess(res, 200, JSON.parse(data));
    } else {
      //proceed to next middleware function
      next();
    }
  });
};
