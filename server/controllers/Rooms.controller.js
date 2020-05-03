const { send, sendError } = require('../utils/send');
const { roomValidation } = require('../validations/Rooms.validation');
const {
  viewValidation,
  idValidation
} = require('../validations/Common.validations');

const Room = require('../models/room.model');
const { validation } = require('../constants/StatusCodes');
const {
  ROLES: { HOSPITAL }
} = require('../constants/enums');

const viewHospitalRooms = async (req, res) => {
  const { error } = idValidation(req.params, 'hospitalID');
  if (error) return sendError(res, validation, error.details[0].message);
  const { error: paginationError } = viewValidation(req.body);
  if (paginationError)
    return sendError(res, validation, paginationError.details[0].message);
  const { page = 0, perPage = 10 } = req.body;
  const { hospitalID } = req.params;
  const { count, rows } = await Room.findAndCountAll(
    {
      where: { hospitalID }
    },
    {
      offset: parseInt(page, 2) * perPage,
      limit: parseInt(perPage, 2)
    }
  );
  const lastPage = Math.ceil(count / parseInt(perPage, 2)) - 1;
  return send({ rooms: rows, meta: { totalEntries: count, lastPage } }, res);
};

const viewRoom = async (req, res) => {
  const { error } = idValidation(req.params);
  if (error) return sendError(res, validation, error.details[0].message);
  const room = await Room.findByPk(req.params.id);
  return send(room, res);
};

const extractID = (req, res) => {
  const { role, accountID } = req.user;
  const hospitalID = role === HOSPITAL ? accountID : req.body.hospitalID;
  if (!hospitalID) return sendError(res, validation, 'hospitalID is required');
  return hospitalID;
};
const createRoom = async (req, res) => {
  const hospitalID = extractID(req, res);
  const { error } = roomValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const payload = { ...req.body, hospitalID };
  const room = await Room.create(payload);
  return send(room, res);
};

const editRoom = async (req, res) => {
  const hospitalID = extractID(req, res);
  const { error } = roomValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const room = await Room.update(req.body, {
    where: { hospitalID },
    returning: true
  });
  return send(room[1][0], res);
};

const deleteRoom = async (req, res) => {
  const { error } = idValidation(req.params);
  if (error) return sendError(res, validation, error.details[0].message);
  const { role, accountID } = req.user;
  const query = {};
  if (role === HOSPITAL) query.hospitalID = accountID;
  const { id } = req.params;
  await Room.destroy({ where: { id, ...query } });
  return send('ok', res);
};

module.exports = {
  viewHospitalRooms,
  viewRoom,
  createRoom,
  editRoom,
  deleteRoom
};
