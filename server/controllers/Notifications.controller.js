const { send, sendError } = require('../utils/send');
const Notification = require('../models/notification.model');
const { idValidation } = require('../validations/Common.validations');
const { validation } = require('../constants/StatusCodes');

const viewUserNotifications = async (req, res) => {
  const { accountID } = req.user;
  const notifications = await Notification.findAll({ where: { accountID } });
  return send(notifications, res);
};

const deleteNotification = async (req, res) => {
  const { error } = idValidation(req.params);
  if (error) sendError(res, validation, error.details[0].message);
  const { accountID } = req.user;
  await Notification.destroy({
    where: { accountID, id: req.params.notificationID }
  });
  return send('ok', res);
};

const deleteAll = async (req, res) => {
  const { accountID } = req.user;
  await Notification.destroy({
    where: { accountID }
  });
  return send('ok', res);
};

const markAsRead = async (req, res) => {
  const { accountID } = req.user;
  console.log(req.user, 'INSIDEEE');
  await Notification.update({ isRead: true }, { where: { accountID } });
  return send('ok', res);
};

module.exports = {
  viewUserNotifications,
  deleteNotification,
  deleteAll,
  markAsRead
};
