const Sequelize = require('sequelize');
const db = require('../DB');
const Account = require('./account.model');

const { Model } = Sequelize;

class Hospital extends Model {}

Hospital.init(
  {
    accountID: {
      type: Sequelize.INTEGER,
      notNull: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    lng: {
      type: Sequelize.DOUBLE,
      defaultValue: 31.23095
    },
    lat: {
      type: Sequelize.DOUBLE,
      defaultValue: 30.04943
    },
    address: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    accountID: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    isComplete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize: db,
    timestamps: false
  }
);

Hospital.belongsTo(Account, {
  foreignKey: 'accountID',
  targetKey: 'id',
  onDelete: 'cascade'
});

Hospital.removeAttribute('id');

module.exports = Hospital;
