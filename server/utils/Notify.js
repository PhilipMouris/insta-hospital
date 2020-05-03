/* eslint-disable no-param-reassign */
const sequelize = require('sequelize');

const { Op } = sequelize;
const Notification = require('../models/notification.model');
const Subscriber = require('../models/subscriber.model');
const Account = require('../models/account.model');
const {
  sendDirectEmail,
  setNotificationMail
} = require('../services/SendGrid');
const { sendNotification } = require('../services/FireBase');
const { ROLES } = require('../constants/enums');

const createNotification = async data => {
  const notification = await Notification.create(data);
  return notification;
};

const notify = async (accountIDs, data) => {
  let accountPromises = [];
  accountIDs.forEach(async account => {
    accountPromises.push(Account.findByPk(account));
    const { actionTitle, ...notification } = data;
    notification.accountID = account;
    await createNotification(notification);
  });
  accountPromises = await Promise.all(accountPromises);
  const subscribers = await Subscriber.findAll({
    where: { accountID: { [Op.in]: accountIDs } }
  });

  const tokens = subscribers.map(subscriber => subscriber.firebaseToken);
  const emails = accountPromises.map(account => account.email);
  const requests = setNotificationMail(emails, data);
  requests.forEach(request => sendDirectEmail(request));
  data.accountIDs = accountIDs;
  sendNotification(tokens, data);
};

const notifyAllAdmins = async data => {
  const admins = await Account.findAll({ where: { role: ROLES.ADMIN } });
  const adminIds = admins.map(admin => admin.id);
  await notify(adminIds, data);
};

module.exports = { notify, notifyAllAdmins };
