'use strict';

module.exports = (sequelize, DataTypes) => {
  const CarritoProducto = sequelize.define('CarritoProducto', {
    id_carrito_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_carrito: {
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
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'carritos_productos',
    timestamps: false
  });

  CarritoProducto.associate = function (models) {
    CarritoProducto.belongsTo(models.Carrito, { foreignKey: 'id_carrito' });
    CarritoProducto.belongsTo(models.Item, { foreignKey: 'id_item' });
  };

  return CarritoProducto;
};
