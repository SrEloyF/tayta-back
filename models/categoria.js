'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
    }
  }
  Categoria.init({
    id_categoria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(55),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    timestamps: false
  });
  return Categoria;
};