const Sequelize = require('sequelize');
const db = require('../DB');

const Account = require('./account.model');

const { Model } = Sequelize;

class Notification extends Model {}

Notification.init(
  {
    accountID: {
      type: Sequelize.INTEGER,
      notNull: true
    },
    isRead: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    body: {
      type: Sequelize.STRING
    },
    img: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    link: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize: db
  }
);

Notification.belongsTo(Account, {
  foreignKey: 'accountID',
  targetKey: 'id',
  onDelete: 'cascade'
});

module.exports = Notification;
