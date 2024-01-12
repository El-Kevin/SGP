const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('BDD_ SPG_SISTEM', 'postgres', 'Lluvia27@', {
    host: 'localhost',
    dialect: 'postgres',
  });
  module.exports = sequelize;