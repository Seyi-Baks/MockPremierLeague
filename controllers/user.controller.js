const UserService = require('../services/users.service');
const response = require('../utility/responseHandler');

exports.userSignUp = async (req, res) => {
  const newUserObj = req.body;

  try {
    const createdUser = await UserService.createUser(newUserObj);

    return response.sendSuccess(res, 201, createdUser);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.userLogin = async (req, res) => {
  const userDetails = req.body;
  try {
    const token = await UserService.loginUser(userDetails);
    req.session.token = token.token;
    return response.sendSuccess(res, 200, token);
  } catch (error) {
    return response.sendError(res, 400, error.message);
  }
};

exports.userLogout = async (req, res) => {};