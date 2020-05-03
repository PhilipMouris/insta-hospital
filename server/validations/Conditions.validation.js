const Joi = require('joi');

const createValidation = request => {
  const schema = {
    name: Joi.string().required(),
    abbreviation: Joi.string()
      .max(4)
      .required()
  };
  return Joi.validate(request, schema);
};

module.exports = { createValidation };
