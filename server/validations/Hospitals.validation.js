const Joi = require('joi');

const editValidation = request => {
  const schema = {
    name: Joi.string(),
    description: Joi.string(),
    lng: Joi.number(),
    lat: Joi.number(),
    address: Joi.string(),
    phoneNumber: Joi.string()
  };
  return Joi.validate(request, schema);
};

const searchValidation = request => {
  const schema = {
    query: Joi.string().allow(''),
    lng: Joi.number(),
    lat: Joi.number()
  };
  return Joi.validate(request, schema);
};

module.exports = { editValidation, searchValidation };
