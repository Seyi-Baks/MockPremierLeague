const mongoose = require('mongoose');
const { statusCodes } = require('../utils/StatusCodes');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a First Name'],
    unique: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please add a Last Name'],
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
    required: [true, 'Please add an Email'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a Password'],
    select: false,
  },
  userType: {
    type: String,
    required: [true, 'Please add a User Type'],
    trim: true,
    enum: [statusCodes.admin, statusCodes.user],
  },
  status: {
    type: String,
    required: [true, 'Please add a Status'],
    trim: true,
    enum: [statusCodes.active, statusCodes.suspended, statusCodes.pending],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    trim: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
