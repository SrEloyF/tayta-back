'use strict';

module.exports = (sequelize, DataTypes) => {
  const Interaccion = sequelize.define('Interaccion', {
    id_interaccion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    id_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    tipo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    fecha_y_hora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'interacciones',
    timestamps: false
  });

  Interaccion.associate = function(models) {
    Interaccion.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
    Interaccion.belongsTo(models.Item, { foreignKey: 'id_item' });
  };

  return Interaccion;
};