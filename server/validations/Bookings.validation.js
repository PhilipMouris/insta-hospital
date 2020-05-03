const Joi = require('joi');
const { BOOKING_STATUS } = require('../constants/enums');

const createValidation = request => {
  const schema = {
    hospitalID: Joi.number()
      .positive()
      .required(),
    date: Joi.date().required(),
    emergency: Joi.bool().required(),
    case: Joi.string().required(),
    additionalNotes: Joi.string()
  };
  return Joi.validate(request, schema);
};

const editValidation = request => {
  const schema = {
    id: Joi.number()
      .positive()
      .required(),
    date: Joi.date(),
    emergency: Joi.bool(),
    case: Joi.string(),
    additionalNotes: Joi.string(),
    status: Joi.string().valid(BOOKING_STATUS.ENUM)
  };
  return Joi.validate(request, schema);
};

module.exports = { createValidation, editValidation };
