const moment = require('moment');
const StatusCodes = require('../constants/StatusCodes');

const { unknown, succuss } = StatusCodes;
// defining the message to be sent in all catches

const sendError = (res, statusCode = unknown, error) => {
  res.set({
    statusCode: statusCode.code,
    timestamp: moment().format()
  });
  const sentError = statusCode.message || error || unknown.message;
  const status = statusCode.httpCode || 500;
  return res.status(status).send({ error: sentError });
};

const send = (data, res) => {
  res.set({
    statusCode: succuss.code,
    timestamp: moment().format()
  });
  return res.json({ data });
};

module.exports = { sendError, send };
