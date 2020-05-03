const express = require('express');
const wrap = require('express-async-wrapper');
const passport = require('passport');
const {
  viewAll,
  viewProfile,
  editProfile,
  searchHospitals
} = require('../controllers/Hospital.controller');
const checkRole = require('../middleware/CheckRole');
const {
  ROLES: { HOSPITAL }
} = require('../constants/enums');

const router = express.Router();

router.get('/', wrap(viewAll));

router.get('/:id', wrap(viewProfile));

router.put(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  checkRole([HOSPITAL]),
  wrap(editProfile)
);

router.post('/searchHospitals', wrap(searchHospitals));

module.exports = router;
