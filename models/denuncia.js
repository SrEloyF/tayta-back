'use strict';

module.exports = (sequelize, DataTypes) => {
  const Denuncia = sequelize.define('Denuncia', {
    id_denuncia: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    id_motivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    texto: {
      type: DataTypes.TEXT,
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
    }
  }, {
    tableName: 'denuncias',
    timestamps: false
  });

  Denuncia.associate = function(models) {
    Denuncia.belongsTo(models.Interaccion, { foreignKey: 'id_denuncia' });
    Denuncia.belongsTo(models.MotivoDenuncia, { foreignKey: 'id_motivo' });
  };

  return Denuncia;
};