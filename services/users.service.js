const User = require('../models/user.model');
const Utility = require('../utility/Utility');
const { statusCodes } = require('../utility/StatusCodes');

exports.createUser = async (user) => {
  try {
    const userEmail = await User.findOne({ email: user.email });
    if (userEmail) {
      throw new Error('Email already exists');
    }

    const newUser = user;
    newUser.userType =
      user.userType === 0 ? statusCodes.user : statusCodes.admin;
    newUser.status = statusCodes.active;
    newUser.password = Utility.hashPassword(user.password);

    const createdUser = await User.create(newUser);
    return createdUser;
  } catch (error) {
    throw new Error(error);
  }
};

exports.loginUser = async (userCredentials) => {
  try {
    const userDetails = await User.findOne({
      email: userCredentials.email,
    }).select('+password');

    if (!userDetails) {
      throw new Error('Invalid user credentials');
    }
    const { id, firstName, lastName, status, userType, email } = userDetails;

    if (status === statusCodes.suspended) {
      throw new Error('User account suspended');
    }

    const checkPassword = Utility.validatePassword(
      userCredentials.password,
      userDetails.password
    );

    if (!checkPassword) {
      throw new Error('Invalid user credentials');
    }

    const tokenDetails = {
      id,
      firstName,
      lastName,
      status,
      userType,
      email,
    };

    const token = Utility.createToken(tokenDetails);

    return { token };
  } catch (error) {
    throw new Error(error);
  }
};
