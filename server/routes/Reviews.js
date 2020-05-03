const express = require('express');
const wrap = require('express-async-wrapper');
const passport = require('passport');

const {
  viewHospitalReviews,
  createReview,
  editReview,
  deleteReview
} = require('../controllers/Reviews.controller');
const checkRole = require('../middleware/CheckRole');
const {
  ROLES: { USER }
} = require('../constants/enums');

const router = express.Router();

router.get('/hospitalReviews/:hospitalID', wrap(viewHospitalReviews));

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  checkRole([USER]),
  wrap(createReview)
);

router.put(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  wrap(editReview)
);

router.delete(
  '/delete/:reviewID',
  passport.authenticate('jwt', { session: false }),
  wrap(deleteReview)
);

module.exports = router;
