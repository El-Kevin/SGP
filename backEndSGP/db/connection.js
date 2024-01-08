const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('db_pruebas', 'postgres', 'Lluvia27@', {
    host: 'localhost',
    dialect: 'postgres',
  });
  module.exports = sequelize;