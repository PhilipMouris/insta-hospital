const Joi = require('joi');

const createValidation = request => {
  const schema = {
    hospitalID: Joi.number()
      .positive()
      .required(),
    rating: Joi.number().positive(),
    text: Joi.string().required()
  };
  return Joi.validate(request, schema);
};

const editValidation = request => {
  const schema = {
    rating: Joi.number(),
    text: Joi.string(),
    id: Joi.number()
      .positive()
      .required()
  };
  return Joi.validate(request, schema);
};

module.exports = { createValidation, editValidation };
