const Sequelize = require('sequelize');
const db = require('../DB');

const { Model } = Sequelize;

class Condition extends Model {}

Condition.init(
  {
    name: {
      type: Sequelize.STRING
    },
    abbreviation: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize: db,
    timestamps: false
  }
);

module.exports = Condition;
