const { statusCodes } = require('../utils/StatusCodes');

const adminPermissions = (req, res, next) => {
  if (!req.token) {
    return res.status(400).json({
      status: statusCodes.badRequest,
      message: 'Token is not valid',
    });
  }
  const { userType } = req.token;
  if (userType !== statusCodes.admin) {
    return res.status(403).json({
      status: statusCodes.forbidden,
      message: 'Unauthorized Access',
    });
  }
  return next();
};

module.exports = adminPermissions;
