const { send, sendError } = require('../utils/send');
const { createValidation } = require('../validations/Subscribers.validation');
const { validation } = require('../constants/StatusCodes');
const Subscriber = require('../models/subscriber.model');

const viewAll = async (req, res) => {
  const subcribers = await Subscriber.findAll();
  return send(subcribers, res);
};

const createSubscriber = async (req, res) => {
  const { error } = createValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const isFound = await Subscriber.findOne({
    where: { firebaseToken: req.body.firebaseToken }
  });
  if (isFound) return send('Subscribed', res);
  const subscriber = await Subscriber.create(req.body);
  return send(subscriber, res);
};

const deleteSubscriber = async (req, res) => {
  const { firebaseToken } = req.params;
  await Subscriber.destroy({ where: { firebaseToken } });
  return send('ok', res);
};

module.exports = {
  viewAll,
  createSubscriber,
  deleteSubscriber
};
