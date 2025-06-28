'use strict';

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    id_item: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    id_vendedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    fecha_y_hora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    es_servicio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    estado: {
      type: DataTypes.STRING(1),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    url_img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'items',
    timestamps: false
  });

  Item.associate = function (models) {
    Item.belongsTo(models.Categoria, { foreignKey: 'id_categoria' });
    Item.belongsTo(models.Usuario, { foreignKey: 'id_vendedor' });
  };

  return Item;
};