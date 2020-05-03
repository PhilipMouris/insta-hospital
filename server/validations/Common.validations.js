const Joi = require('joi');

const viewValidation = request => {
  const schema = {
    page: Joi.number().positive()
  };
  return Joi.validate(request, schema);
};

const idValidation = (request, param = 'id') => {
  const schema = {
    [param]: Joi.number()
      .positive()
      .required()
  };
  return Joi.validate(request, schema);
};

module.exports = { viewValidation, idValidation };
