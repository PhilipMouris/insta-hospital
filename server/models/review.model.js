const Sequelize = require('sequelize');
const db = require('../DB');
const Account = require('./account.model');

const { Model } = Sequelize;

class Review extends Model {}

Review.init(
  {
    rating: {
      type: Sequelize.DOUBLE
    },
    text: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize: db
  }
);

Review.belongsTo(Account, {
  as: 'user',
  targetKey: 'id',
  onDelete: 'cascade',

  notNull: true
});

Review.belongsTo(Account, {
  as: 'hospital',
  targetKey: 'id',
  onDelete: 'cascade',

  notNull: true
});

module.exports = Review;
