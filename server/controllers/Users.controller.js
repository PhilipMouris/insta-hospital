const { send, sendError } = require('../utils/send');
const {
  editValidation,
  setConditionsValidation
} = require('../validations/Users.validations');
const { viewValidation } = require('../validations/Common.validations');
const { validation } = require('../constants/StatusCodes');
const User = require('../models/user.model');
const Account = require('../models/account.model');
const UserConditions = require('../models/userConditions.model');
const Condition = require('../models/condition.model');

const viewAll = async (req, res) => {
  const { error } = viewValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const { page = 0, perPage = 10 } = req.body;
  const { count, rows } = await User.findAndCountAll(
    { include: [{ model: Account, required: true }] },
    {
      offset: parseInt(page, 2) * perPage,
      limit: parseInt(perPage, 2)
    }
  );
  const lastPage = Math.ceil(count / parseInt(perPage, 2)) - 1;
  return send({ users: rows, meta: { totalEntries: count, lastPage } }, res);
};

const viewProfile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { accountID: id },
    include: [{ model: Account }]
  });
  return send(user, res);
};

const editProfileUser = async (req, res) => {
  const { error } = editValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  const user = await User.update(req.body, {
    where: { accountID: req.user.accountID },
    returning: true
  });
  return send(user[1][0], res);
};

const addConditions = async (req, res) => {
  const { error } = setConditionsValidation(req.body);
  if (error) return sendError(res, validation, error.details[0].message);
  await UserConditions.destroy({ where: { userID: req.user.accountID } });
  const { conditions } = req.body;
  await Promise.all(
    conditions.map(condition =>
      UserConditions.create({
        userID: req.user.accountID,
        conditionID: condition
      })
    )
  );
  return send('ok', res);
};

const removeCondition = async (req, res) => {
  const { conditionID } = req.params;
  await UserConditions.destroy({ where: { conditionID } });
  return send('ok', res);
};

const getUserConditions = async (req, res) => {
  const { id } = req.params;
  const conditions = await UserConditions.findAll({
    where: { userID: id },
    include: [{ model: Condition }]
  });
  return send(conditions, res);
};

module.exports = {
  viewAll,
  viewProfile,
  editProfileUser,
  addConditions,
  removeCondition,
  getUserConditions
};
