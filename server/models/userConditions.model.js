const Sequelize = require('sequelize');
const db = require('../DB');
const Account = require('./account.model');
const Condition = require('./condition.model');

const { Model } = Sequelize;

class UserCondition extends Model {}

UserCondition.init(
  {
    userID: {
      type: 'int',
      primaryKey: true
    },
    conditionID: {
      type: 'int',
      primaryKey: true
    }
  },
  { sequelize: db, timestamps: false }
);

UserCondition.belongsTo(Account, {
  foreignKey: 'userID',
  targetKey: 'id',
  onDelete: 'cascade',
  primaryKey: true
});

UserCondition.belongsTo(Condition, {
  foreignKey: 'conditionID',
  targetKey: 'id',
  onDelete: 'cascade',
  primaryKey: true
});

UserCondition.removeAttribute('id');

module.exports = UserCondition;
