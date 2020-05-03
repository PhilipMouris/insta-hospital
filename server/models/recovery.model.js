const Sequelize = require('sequelize');
const db = require('../DB');
const Account = require('./account.model');

const { Model } = Sequelize;

class Recovery extends Model {}

Recovery.init(
  {
    email: {
      type: Sequelize.STRING,
      notNull: true,
      primaryKey: true
    },
    code: {
      type: Sequelize.STRING,
      notNull: true
    }
  },
  { sequelize: db }
);

Recovery.removeAttribute('id');

Recovery.belongsTo(Account, {
  foreignKey: 'email',
  targetKey: 'email',
  onDelete: 'cascade'
});

module.exports = Recovery;
