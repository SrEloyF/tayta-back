'use strict';

module.exports = (sequelize, DataTypes) => {
  const Carrito = sequelize.define('Carrito', {
    id_carrito: {
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
    estado: {
      type: DataTypes.ENUM('V', 'E'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    fecha_compra: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    tableName: 'carritos',
    timestamps: false
  });

  Carrito.associate = function (models) {
    Carrito.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
  };

  return Carrito;
};
