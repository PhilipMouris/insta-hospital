const nodemailer = require('nodemailer');
const Email = require('../mail/forgetPassword');
const notificationMail = require('../mail/notificationmail');
const { send, sendError } = require('../utils/send');
const { emailNotSent } = require('../constants/StatusCodes');

const { SEND_GRID_SERVICE, SEND_GRID_USER, SEND_GRID_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: SEND_GRID_SERVICE,
  auth: {
    user: SEND_GRID_USER,
    pass: SEND_GRID_PASSWORD
  }
});

const setEmail = email => {
  let randomCode = '';
  for (let i = 0; i < 9; i += 1) {
    const charCode = Math.floor(Math.random() * (126 - 48) + 48);
    randomCode += String.fromCharCode(charCode);
  }
  const request = {
    from: 'notification@instaHospital.com',
    to: email,
    subject: 'Password Reset',
    html: Email.replace('Code:', `Code:${randomCode}`)
  };
  return { request, randomCode };
};

const sendEmail = (request, req, res) => {
  transporter.sendMail(request, (error, info) => {
    if (error) return sendError(res, emailNotSent);
    return send(info.response, res);
  });
};

const sendDirectEmail = request => {
  transporter.sendMail(request, (error, info) => {
    if (error) console.log(error);
    else console.log(info.response);
  });
};

const setNotificationMail = (emails, data) => {
  let email = notificationMail.replace('notificationTitle', data.title);
  email = email.replace('notificationBody', data.body);
  email = email.replace('LINKR', data.link);
  email = email.replace('LINKR', data.link);
  const requests = emails.map(userEmail => ({
    from: 'notification@instaHospital.com',
    to: userEmail,
    subject: 'InstaHospital Notification',
    html: email
  }));
  return requests;
};

module.exports = { setEmail, sendEmail, setNotificationMail, sendDirectEmail };
