const express = require('express');
const wrap = require('express-async-wrapper');
const passport = require('passport');

const {
  signUp,
  login,
  changePassword,
  deleteAccount,
  sendMail,
  recovery,
  forgetPassword
} = require('../controllers/Accounts.controller');

const router = express.Router();

router.post('/signup', wrap(signUp));

router.post('/login', wrap(login));

router.put(
  '/changePassword',
  passport.authenticate('jwt', { session: false }),
  wrap(changePassword)
);

router.delete(
  '/deleteAccount',
  passport.authenticate('jwt', { session: false }),
  deleteAccount
);

router.post('/sendEmail', wrap(sendMail));

router.post('/recovery', wrap(recovery));

router.post(
  '/forgotPassword',
  passport.authenticate('jwt', { session: false }),
  wrap(forgetPassword)
);

module.exports = router;
