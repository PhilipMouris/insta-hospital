const Sequelize = require('sequelize');

// Connecting to local postgres (in development)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

module.exports = sequelize;
