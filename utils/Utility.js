const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(15);
  return bcrypt.hashSync(password, salt);
};

exports.validatePassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword);
};

exports.createToken = (details) => {
  return jwt.sign(details, process.env.SECRET, { expiresIn: '24h' });
};

exports.checkToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers.authorization;

  // Check if bearer is available
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');

    // Get token from array
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: `Token is not valid ${err}`,
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'Auth token is not supplied',
    });
  }
};
