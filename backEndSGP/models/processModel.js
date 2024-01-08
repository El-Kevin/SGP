const DataTypes  = require('sequelize');


const sequelize = require('../db/connection');

const Project = sequelize.define('proceso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_proceso: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  anio_proceso: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  estado_proceso: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'proceso', // Especifica el nombre de la tabla aquí
  timestamps: false // Evita la creación automática de createdAt y updatedAt
});

// Exportar el modelo
module.exports = Project;

