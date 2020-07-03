const jwt = require('jsonwebtoken');
const response = require('../utils/ResponseHandler');

decodeToken = (req, res, next, token) => {
  jwt.verify(token, process.env.SECRET, (error, decode) => {
    if (!error) {
      req.token = decode;
      return next();
    }
    return response.sendError(res, 400, 'Invalid token request');
  });
};

const authMiddleware = (req, res, next) => {
  let token =
    req.headers['x-access-token'] ||
    req.headers.Authorization ||
    req.headers.token ||
    req.headers.authorization;
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (token) {
    return decodeToken(req, res, next, token);
  }

  return response.sendError(
    res,
    400,
    'Please assign an access token as a header'
  );
};

module.exports = authMiddleware;
