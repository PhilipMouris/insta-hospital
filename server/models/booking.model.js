const Sequelize = require('sequelize');
const db = require('../DB');
const Account = require('./account.model');
const { BOOKING_STATUS } = require('../constants/enums');

const { Model } = Sequelize;

class Booking extends Model {}

Booking.init(
  {
    userID: {
      type: Sequelize.INTEGER,
      notNull: true
    },
    hospitalID: {
      type: Sequelize.INTEGER,
      notNull: true
    },
    status: {
      type: Sequelize.ENUM(BOOKING_STATUS.ENUM),
      defaultValue: BOOKING_STATUS.PENDING
    },
    date: {
      type: Sequelize.DATE
    },
    emergency: {
      type: Sequelize.BOOLEAN
    },
    additionalNotes: {
      type: Sequelize.STRING
    },
    case: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize: db,
    timestamps: false
  }
);

Booking.belongsTo(Account, {
  foreignKey: 'userID',
  targetKey: 'id',
  onDelete: 'cascade'
});

Booking.belongsTo(Account, {
  foreignKey: 'hospitalID',
  targetKey: 'id',
  onDelete: 'cascade'
});

module.exports = Booking;
