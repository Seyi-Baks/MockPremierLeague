exports.sendSuccess = (res, statusCode, data) => {
  const response = {
    success: true,
    data,
  };

  return res.status(statusCode).json(response);
};

exports.sendError = (res, statusCode, message) => {
  const response = {
    success: false,
    error: message,
  };

  return res.status(statusCode).json(response);
};
