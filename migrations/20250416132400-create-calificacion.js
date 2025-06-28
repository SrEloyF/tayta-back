'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('calificaciones', {
      id_calificacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'interacciones',
          key: 'id_interaccion'
        }
      },
      calificacion: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      comentario: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('calificaciones');
  }
};
