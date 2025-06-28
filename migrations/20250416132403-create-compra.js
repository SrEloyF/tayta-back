'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('compras', {
      id_compra: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'interacciones',
          key: 'id_interaccion'
        }
      },
      estado: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      precio_establecido: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      porcentaje: {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('compras');
  }
};
