const express = require('express');
const wrap = require('express-async-wrapper');
const passport = require('passport');

const {
  viewHospitalRooms,
  viewRoom,
  createRoom,
  editRoom,
  deleteRoom
} = require('../controllers/Rooms.controller');
const checkRole = require('../middleware/CheckRole');
const {
  ROLES: { HOSPITAL, ADMIN }
} = require('../constants/enums');

const router = express.Router();

router.get('/:hospitalID', wrap(viewHospitalRooms));

router.get('/viewRoom/:id', wrap(viewRoom));

router.post(
  '/create',
  passport.authenticate('jwt', { session: false }),
  checkRole([HOSPITAL, ADMIN]),
  wrap(createRoom)
);

router.put(
  '/edit',
  passport.authenticate('jwt', { session: false }),
  checkRole([HOSPITAL, ADMIN]),
  wrap(editRoom)
);

router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole([HOSPITAL, ADMIN]),
  wrap(deleteRoom)
);

module.exports = router;
