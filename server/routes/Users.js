const express = require('express');
const wrap = require('express-async-wrapper');
const passport = require('passport');

const {
  viewAll,
  viewProfile,
  editProfileUser,
  addConditions,
  removeCondition,
  getUserConditions
} = require('../controllers/Users.controller');
const checkRole = require('../middleware/CheckRole');
const { ROLES } = require('../constants/enums');

const router = express.Router();

router.get('/', wrap(viewAll));

router.get('/:id', wrap(viewProfile));

router.put(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  checkRole([ROLES.USER]),
  wrap(editProfileUser)
);

router.put(
  '/addConditions',
  passport.authenticate('jwt', { session: false }),
  checkRole([ROLES.USER]),
  wrap(addConditions)
);

router.delete(
  '/removeCondition/:conditionID',
  passport.authenticate('jwt', { session: false }),
  checkRole([ROLES.USER]),
  wrap(removeCondition)
);

router.get('/getConditions/:id', wrap(getUserConditions));
module.exports = router;
