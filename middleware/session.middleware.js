const statusCodes = require('../utils/statusCodes');
const response = require('../utils/ResponseHandler');

export const redirectLogin = (req, res, next) => {
  if (!req.session.token) {
    return res.status(400).json({
      status: statusCodes.badRequest,
      message: 'Please log in first. Thank you',
    });
  }
  return next();
};

export const redirectHome = (req, res, next) => {
  if (req.session.token) {
    return response.sendError(res, 400, 'The user is already logged in');
  }
  return next();
};
