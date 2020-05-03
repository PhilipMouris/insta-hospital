const Joi = require('joi');
const { ROOM_STATUS } = require('../constants/enums');

const roomValidation = request => {
  const schema = {
    roomNumber: Joi.string(),
    roomStatus: Joi.string().valid(ROOM_STATUS.ENUM)
  };
  return Joi.validate(request, schema);
};

module.exports = { roomValidation };
