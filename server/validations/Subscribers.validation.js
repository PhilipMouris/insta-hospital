const Joi = require('joi');

const createValidation = request => {
  const schema = {
    accountID: Joi.number().positive(),
    firebaseToken: Joi.string()
  };
  return Joi.validate(request, schema);
};

module.exports = { createValidation };
