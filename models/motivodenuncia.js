'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MotivoDenuncia extends Model {
    static associate(models) {
    }
  }
  MotivoDenuncia.init({
    id_motivo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(55),
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'MotivoDenuncia',
    tableName: 'motivos_denuncia',
    timestamps: false
  });
  return MotivoDenuncia;
};