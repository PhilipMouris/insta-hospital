const { send, sendError } = require('../utils/send');
const { createValidation } = require('../validations/Conditions.validation');
const { ROLES } = require('../constants/enums');
const Condition = require('../models/condition.model');
const { validation, unauthorized } = require('../constants/StatusCodes');

const viewAll = async (req, res) => {
  const conditions = await Condition.findAll();
  return send(conditions, res);
};

const create = async (req, res) => {
  const { error } = createValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { name, abbreviation } = req.body;
  const condition = await Condition.create({ name, abbreviation });
  return send(condition, res);
};

const update = async (req, res) => {
  if (req.user.role !== ROLES.ADMIN) return sendError(res, unauthorized);
  const { error } = createValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { id } = req.params;
  const { name, abbreviation } = req.body;
  const condition = await Condition.update(
    { name, abbreviation },
    { where: { id }, returning: true }
  );
  return send(condition[1][0], res);
};

const deleteCondition = async (req, res) => {
  if (req.user.role !== ROLES.ADMIN) return sendError(res, unauthorized);
  const { error } = createValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { id } = req.params;
  await Condition.destroy({ where: { id } });
  return send('ok', res);
};

module.exports = { viewAll, create, update, deleteCondition };
