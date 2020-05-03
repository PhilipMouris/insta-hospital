const express = require('express');
const wrap = require('express-async-wrapper');
const passport = require('passport');
const {
  create,
  update,
  deleteCondition,
  viewAll
} = require('../controllers/Conditions.controller');
const checkRole = require('../middleware/CheckRole');
const { ROLES } = require('../constants/enums');

const router = express.Router();

router.get('/', wrap(viewAll));

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  checkRole([ROLES.ADMIN]),
  wrap(create)
);
router.post(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole([ROLES.ADMIN]),
  wrap(update)
);

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole([ROLES.ADMIN]),
  wrap(deleteCondition)
);

module.exports = router;
