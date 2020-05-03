const Sequelize = require('sequelize');
const db = require('../DB');
const Account = require('./account.model');

const { Model } = Sequelize;

class Subsciber extends Model {}

Subsciber.init(
  {
    accountID: {
      type: Sequelize.INTEGER
    },
    firebaseToken: {
      type: Sequelize.STRING,
      notNull: true
    }
  },
  { sequelize: db }
);

Subsciber.belongsTo(Account, {
  foreignKey: 'accountID',
  targetKey: 'id',
  onDelete: 'cascade'
});

module.exports = Subsciber;
