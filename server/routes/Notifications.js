const express = require('express');
const wrap = require('express-async-wrapper');
const passport = require('passport');

const router = express.Router();

const {
  viewUserNotifications,
  deleteNotification,
  deleteAll,
  markAsRead
} = require('../controllers/Notifications.controller');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  wrap(viewUserNotifications)
);

router.delete(
  '/delete/:notificaitonID',
  passport.authenticate('jwt', { session: false }),
  wrap(deleteNotification)
);

router.delete(
  '/deleteAll',
  passport.authenticate('jwt', { session: false }),
  wrap(deleteAll)
);

router.put(
  '/markAsRead',
  passport.authenticate('jwt', { session: false }),
  wrap(markAsRead)
);

module.exports = router;
