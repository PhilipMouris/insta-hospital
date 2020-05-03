const Joi = require('joi');
const { ROLES } = require('../constants/enums');

const signupValidation = request => {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
    role: Joi.valid(ROLES.ENUM).required()
  };
  return Joi.validate(request, schema);
};

const loginValidation = request => {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string().required()
  };
  return Joi.validate(request, schema);
};

const changePasswordValidation = request => {
  const schema = {
    oldPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .required(),
    passwordConfirmation: Joi.string()
      .min(8)
      .required()
  };
  return Joi.validate(request, schema);
};

const sendEmailValidation = request => {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
  };
  return Joi.validate(request, schema);
};

const recoverValidation = request => {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    code: Joi.string().required()
  };
  return Joi.validate(request, schema);
};

const forgotPasswordValidation = request => {
  const schema = {
    password: Joi.string()
      .min(8)
      .required(),
    passwordConfirm: Joi.string().required()
  };
  return Joi.validate(request, schema);
};

module.exports = {
  signupValidation,
  loginValidation,
  changePasswordValidation,
  sendEmailValidation,
  recoverValidation,
  forgotPasswordValidation
};
