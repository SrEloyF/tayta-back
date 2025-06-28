'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('productos', {
      id_producto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'items',
          key: 'id_item'
        }
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('productos');
  }
};
