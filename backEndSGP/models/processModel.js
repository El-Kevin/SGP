const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('db_pruebas', 'postgres', 'Lluvia27@', {
  host: 'localhost',
  dialect: 'postgres',
});

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
  },
  anio_proceso: {
    type: DataTypes.INTEGER,
  },
  estado_proceso: {
    type: DataTypes.STRING,
  },
  etapa_proceso: {
    type: DataTypes.STRING,
  },
  fecha_fin: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'proceso', // Especifica el nombre de la tabla aquí
  timestamps: false // Evita la creación automática de createdAt y updatedAt
});

// Exportar el modelo
module.exports = Project;

