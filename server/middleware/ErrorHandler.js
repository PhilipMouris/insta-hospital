const { sendError } = require('../utils/send');

const errorHandler = (err, req, res, next) => {
  if (!err) return next();
  console.log(err, 'ERROR');
  return sendError(res, { message: err }, err);
};

module.exports = errorHandler;
