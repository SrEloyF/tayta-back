'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
      id_item: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categorias',
          key: 'id_categoria'
        }
      },
      id_vendedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id_usuario'
        }
      },
      nombre: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      fecha_y_hora: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      precio: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      es_servicio: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING(1),
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};
