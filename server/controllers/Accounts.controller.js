const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { send, sendError } = require('../utils/send');
const {
  signupValidation,
  loginValidation,
  changePasswordValidation,
  sendEmailValidation,
  recoverValidation,
  forgotPasswordValidation
} = require('../validations/Accounts.validation');
const {
  validation,
  emailExists,
  wrongCredentials,
  nonMatchingPasswords,
  wrongPassword,
  entityNotFound,
  wrongRecoveryCode
} = require('../constants/StatusCodes');
const { ROLES } = require('../constants/enums');
const Account = require('../models/account.model');
const User = require('../models/user.model');
const Hospital = require('../models/hospital.model');
const Recovery = require('../models/recovery.model');
const { setEmail, sendEmail } = require('../services/SendGrid');
const { notify } = require('../utils/Notify');
const {
  signUpNotification,
  passwordRecovered
} = require('../constants/notifications');

const signUp = async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { email, password, role } = req.body;
  const emailCheck = await Account.findOne({ where: { email } });
  if (emailCheck) return sendError(res, emailExists);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const account = await Account.create({
    email,
    password: hashedPassword,
    role,
    img: 'https://picsum.photos/400'
  });
  if (role === ROLES.USER)
    await User.create({
      accountID: account.id
    });
  if (role === ROLES.HOSPITAL)
    await Hospital.create({
      accountID: account.id
    });
  notify([account.id], signUpNotification);
  return send(account, res);
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { email, password } = req.body;
  const account = await Account.findOne({ where: { email } });
  if (!account) return sendError(res, wrongCredentials);
  const match = bcrypt.compareSync(password, account.password);
  if (!match) return sendError(res, wrongCredentials);
  const { role, id, img } = account;
  const payload = { accountID: id, email: account.email, img, role };
  payload.token = jwt.sign(payload, process.env.TOKEN_KEY);
  return send(payload, res);
};

const changePassword = async (req, res) => {
  const { error } = changePasswordValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { oldPassword, newPassword, passwordConfirmation } = req.body;
  const { accountID } = req.user;
  const account = await Account.findByPk(accountID);
  const match = bcrypt.compareSync(oldPassword, account.password);
  if (!match) return sendError(res, wrongPassword);
  if (newPassword !== passwordConfirmation)
    return sendError(res, nonMatchingPasswords);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);
  await Account.update(
    {
      password: hashedPassword
    },
    { where: { id: accountID } }
  );

  return send('ok', res);
};

const deleteAccount = async (req, res) => {
  const { accountID } = req.user;
  await Account.destroy({ where: { id: accountID } });
  return send('ok', res);
};

// eslint-disable-next-line consistent-return
const sendMail = async (req, res) => {
  const { error: validationError } = sendEmailValidation(req.body);
  if (validationError)
    return sendError(res, validation, validationError.details[0].message);
  const { email } = req.body;
  const account = Account.findOne({ where: { email } });
  if (!account) return sendError(res, entityNotFound);
  const { request, randomCode } = setEmail(email);
  const salt = bcrypt.genSaltSync(10);
  const hashedCode = bcrypt.hashSync(randomCode, salt);
  const recoverd = await Recovery.findByPk(email);
  if (recoverd)
    await Recovery.update({ code: hashedCode }, { where: { email } });
  else await Recovery.create({ code: hashedCode, email });
  await sendEmail(request, req, res);
};

const recovery = async (req, res) => {
  const { error } = recoverValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { email, code } = req.body;
  const recoverd = await Recovery.findByPk(email);
  if (!recoverd) return sendError(res, entityNotFound);
  const match = bcrypt.compareSync(code, recoverd.code);
  if (!match) return sendError(res, wrongRecoveryCode);
  const tokenPayload = {
    email
  };
  const response = jwt.sign(tokenPayload, process.env.TOKEN_KEY);
  return send(response, res);
};

const forgetPassword = async (req, res) => {
  const { error } = forgotPasswordValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { password, passwordConfirm } = req.body;
  if (password !== passwordConfirm) return sendError(res, nonMatchingPasswords);
  const { email } = req.user;
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const user = await Account.update(
    { password: hashedPassword },
    { where: { email }, returning: true }
  );
  notify([user.id], passwordRecovered);
  return send('ok', res);
};

module.exports = {
  signUp,
  login,
  changePassword,
  deleteAccount,
  sendMail,
  recovery,
  forgetPassword
};
