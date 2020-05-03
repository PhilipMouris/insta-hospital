const Joi = require('joi');
const { GENDERS, BLOOD_TYPES } = require('../constants/enums');

const editValidation = request => {
  const schema = {
    name: Joi.string(),
    birthDate: Joi.date(),
    weight: Joi.number(),
    gender: Joi.string().valid(GENDERS.ENUM),
    mobile: Joi.string(),
    allergies: Joi.string(),
    diabetes: Joi.bool(),
    bloodType: Joi.string().valid(BLOOD_TYPES),
    surgicalHistory: Joi.string()
  };
  return Joi.validate(request, schema);
};

const setConditionsValidation = request => {
  const schema = {
    conditions: Joi.array().required()
  };
  return Joi.validate(request, schema);
};

module.exports = { editValidation, setConditionsValidation };
