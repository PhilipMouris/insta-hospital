const Sequelize = require('sequelize');

const db = require('../DB');
const { ROLES } = require('../constants/enums');

const { Model } = Sequelize;

class Account extends Model {}

Account.init(
  {
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM(ROLES.ENUM)
    },
    img: {
      type: Sequelize.STRING
    }
  },

  {
    sequelize: db
  }
);

module.exports = Account;
