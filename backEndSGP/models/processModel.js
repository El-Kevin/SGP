const DataTypes  = require('sequelize');
const User = require('./userModel');
const sequelize = require('../db/connection');
const Project = sequelize.define('process_table', {
  id_process : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  process_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  process_year: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  process_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  user_table_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User, // Modelo de la tabla user_table
      key: 'id_user', // Clave primaria referenciada en user_table
    },
    allowNull: true,
  }
}, {
  tableName: 'process_table', // Especifica el nombre de la tabla aquí
  timestamps: false // Evita la creación automática de createdAt y updatedAt
});

// Exportar el modelo
module.exports = Project;

