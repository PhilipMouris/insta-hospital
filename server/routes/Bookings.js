const express = require('express');
const wrap = require('express-async-wrapper');
const passport = require('passport');

const {
  viewUserBookings,
  viewHospitalBookings,
  viewBooking,
  createBooking,
  editBooking,
  deleteBooking
} = require('../controllers/Bookings.controller');

const checkRole = require('../middleware/CheckRole');

const {
  ROLES: { HOSPITAL, USER }
} = require('../constants/enums');

const router = express.Router();

router.get('/userBookings/:userID', wrap(viewUserBookings));

router.get('/hospitalBookings/:hospitalID', wrap(viewHospitalBookings));

router.get('/:id', wrap(viewBooking));

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  checkRole([USER]),
  wrap(createBooking)
);

router.put(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  checkRole([USER, HOSPITAL]),
  wrap(editBooking)
);

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole([USER]),
  wrap(deleteBooking)
);

module.exports = router;
