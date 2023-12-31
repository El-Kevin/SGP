const DataTypes  = require('sequelize');
const sequelize = require('../db/connection');
const User = sequelize.define('user_table', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'user_table', // Especifica el nombre de la tabla aquí
    timestamps: false // Evita la creación automática de createdAt y updatedAt
  });
  
  // Exportar el modelo
  module.exports = User;