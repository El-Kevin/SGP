const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Process = require('./processModel');

const DetailProcess = sequelize.define('detail_process', {
  id_detail: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  elements_snt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stage_detail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notification_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  check_status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  process_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Process, // Modelo de la tabla process_table
      key: 'id_process', // Clave primaria referenciada en process_table
    },
    allowNull: true,
  }
}, {
  tableName: 'detail_process', // Especifica el nombre de la tabla aquí
  timestamps: false // Evita la creación automática de createdAt y updatedAt
});

// Exportar el modelo
module.exports = DetailProcess;
