const DataTypes  = require('sequelize');
const sequelize = require('../db/connection');
const User = sequelize.define('user_table', {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'user_table', // Especifica el nombre de la tabla aquí
    timestamps: false // Evita la creación automática de createdAt y updatedAt
  });
  
  // Exportar el modelo
  module.exports = User;