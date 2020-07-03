const redis_client = require('../../config/redis_db');
const response = require('../../utils/ResponseHandler');

//Middleware Function to Check Cache
exports.checkTeamCache = (req, res, next) => {
  const { teamId } = req.params;

  redis_client.get(teamId, (err, data) => {
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

exports.checkTeamsCache = (req, res, next) => {
  redis_client.get('teams', (err, data) => {
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
