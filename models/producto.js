'use strict';

module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0
      }
    }
  }, {
    tableName: 'productos',
    timestamps: false
  });

  Producto.associate = function(models) {
    Producto.belongsTo(models.Item, { foreignKey: 'id_producto' });
  };

  return Producto;
};