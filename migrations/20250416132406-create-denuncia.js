'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('denuncias', {
      id_denuncia: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'interacciones',
          key: 'id_interaccion'
        }
      },
      id_motivo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'motivos_denuncia',
          key: 'id_motivo'
        }
      },
      texto: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      estado: {
        type: Sequelize.STRING(1),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('denuncias');
  }
};
