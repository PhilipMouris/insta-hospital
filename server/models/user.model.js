const Sequelize = require('sequelize');
const db = require('../DB');
const Account = require('./account.model');
const { GENDERS, BLOOD_TYPES } = require('../constants/enums');

const { Model } = Sequelize;

class User extends Model {}

User.init(
  {
    accountID: {
      type: Sequelize.INTEGER,
      notNull: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    birthDate: {
      type: Sequelize.DATE
    },
    weight: {
      type: Sequelize.DOUBLE
    },
    gender: {
      type: Sequelize.ENUM(GENDERS.ENUM)
    },
    mobile: {
      type: Sequelize.STRING
    },
    allergies: {
      type: Sequelize.STRING
    },
    diabetes: {
      type: Sequelize.BOOLEAN
    },
    bloodType: {
      type: Sequelize.ENUM(BLOOD_TYPES)
    },
    surgicalHistory: {
      type: Sequelize.STRING
    },

    age: {
      type: Sequelize.VIRTUAL,
      get() {
        const birthDate = this.getDataValue('birthDate');
        if (!birthDate) return null;
        return new Date().getFullYear() - new Date(birthDate).getFullYear();
      }
    }
  },
  {
    sequelize: db,
    timestamps: false
  }
);

User.belongsTo(Account, {
  foreignKey: 'accountID',
  targetKey: 'id',
  onDelete: 'cascade'
});
User.removeAttribute('id');

module.exports = User;
