const { send, sendError } = require('../utils/send');
const {
  createValidation,
  editValidation
} = require('../validations/Bookings.validation');
const {
  BOOKING_STATUS: { PENDING, CONFIRMED },
  ROLES: { HOSPITAL },
  ROOM_STATUS: { AVAILABLE, BOOKED }
} = require('../constants/enums');
const Booking = require('../models/booking.model');
const Account = require('../models/account.model');
const User = require('../models/user.model');
const Room = require('../models/room.model');
const { noFreeRoom } = require('../constants/StatusCodes');

const { validation, entityNotFound } = require('../constants/StatusCodes');
const {
  viewValidation,
  idValidation
} = require('../validations/Common.validations');
const { notify } = require('../utils/Notify');
const { userBooking, bookingConfirmed } = require('../constants/notifications');

const viewHospitalBookings = async (req, res) => {
  const { error } = idValidation(req.params, 'hospitalID');
  if (error) return sendError(res, validation, error.details[0].message);
  const { error: paginationError } = viewValidation(req.body);
  if (paginationError)
    return sendError(res, validation, paginationError.details[0].message);
  const { page = 0, perPage = 10 } = req.body;
  const { hospitalID } = req.params;
  const { count, rows } = await Booking.findAndCountAll(
    {
      where: { hospitalID }
    },
    {
      offset: parseInt(page) * perPage,
      limit: parseInt(perPage)
    }
  );
  const lastPage = Math.ceil(count / parseInt(perPage)) - 1;
  return send({ bookings: rows, meta: { totalEntries: count, lastPage } }, res);
};

const viewUserBookings = async (req, res) => {
  const { error } = idValidation(req.params, 'userID');
  if (error) return sendError(res, validation, error.details[0].message);
  const { error: paginationError } = viewValidation(req.body);
  if (paginationError)
    return sendError(res, validation, paginationError.details[0].message);
  const { page = 0, perPage = 10 } = req.body;
  const { userID } = req.params;
  const { count, rows } = await Booking.findAndCountAll(
    {
      where: { userID }
    },
    {
      offset: parseInt(page) * perPage,
      limit: parseInt(perPage)
    }
  );
  const lastPage = Math.ceil(count / parseInt(perPage)) - 1;
  return send({ bookings: rows, meta: { totalEntries: count, lastPage } }, res);
};

const viewBooking = async (req, res) => {
  const { error } = idValidation(req.params);
  if (error) return sendError(res, validation, error.details[0].message);
  const booking = await Booking.findByPk(req.params.id);
  return send(booking, res);
};

const checkHospital = async (req, res) => {
  const { hospitalID } = req.body;
  const hospitalCheck = await Account.findOne({
    where: { id: hospitalID, role: HOSPITAL }
  });
  if (!hospitalCheck) return sendError(res, entityNotFound);
  return hospitalCheck;
};

const checkBooking = async (id, res) => {
  const booking = await Booking.findByPk(id);
  if (!booking) return sendError(res, entityNotFound);
  return booking;
};

const createBooking = async (req, res) => {
  const { error } = createValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  await checkHospital(req, res);
  req.body.userID = req.user.accountID;
  req.body.status = PENDING;
  const booking = await Booking.create(req.body);
  const user = await User.findOne({
    include: [{ model: Account }],
    where: { accountID: req.user.accountID }
  });
  notify([req.body.hospitalID], userBooking(user.name, user.Account.img));
  return send(booking, res);
};

const editBooking = async (req, res) => {
  const { error } = editValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { id } = req.body;
  const oldBooking = await checkBooking(id, res);
  delete req.body.id;

  if (req.body.status === CONFIRMED) {
    const hospital = await checkHospital({
      body: { hospitalID: oldBooking.hospitalID }
    });
    const freeRoom = await Room.findOne({
      where: { hospitalID: oldBooking.hospitalID, roomStatus: AVAILABLE }
    });
    console.log(freeRoom, 'FREE');
    if (!freeRoom) return sendError(res, noFreeRoom);
    await Room.update({ roomStatus: BOOKED }, { where: { id: freeRoom.id } });
    notify([oldBooking.userID], bookingConfirmed(oldBooking.id, hospital.img));
  }
  const result = await Booking.update(req.body, {
    where: { id },
    returning: true
  });
  const booking = result[1][0];

  return send(booking, res);
};

const deleteBooking = async (req, res) => {
  const { error } = idValidation(req.params);
  if (error) return sendError(res, validation, error.details[0].message);
  const { id } = req.params;
  await checkBooking(id, res);
  await Booking.destroy({
    where: { id, userID: req.user.accountID }
  });
  return send('ok', res);
};

module.exports = {
  viewUserBookings,
  viewHospitalBookings,
  viewBooking,
  createBooking,
  editBooking,
  deleteBooking
};
