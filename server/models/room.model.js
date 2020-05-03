const Sequelize = require('sequelize');
const db = require('../DB');
const Account = require('./account.model');
const { ROOM_STATUS } = require('../constants/enums');

const { Model } = Sequelize;

class Room extends Model {}

Room.init(
  {
    hospitalID: {
      type: Sequelize.INTEGER,
      notNull: true
    },
    roomNumber: {
      type: Sequelize.STRING
    },
    roomStatus: {
      type: Sequelize.ENUM(ROOM_STATUS.ENUM),
      defaultValue: ROOM_STATUS.AVAILABLE
    }
  },
  {
    sequelize: db,
    timestamps: false
  }
);

Room.belongsTo(Account, {
  foreignKey: 'hospitalID',
  targetKey: 'id',
  onDelete: 'cascade'
});

module.exports = Room;
