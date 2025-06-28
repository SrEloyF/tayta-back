'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carritos_productos', {
      id_carrito_producto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_carrito: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carritos',
          key: 'id_carrito'
        },
      },
      id_item: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'items',
          key: 'id_item'
        },
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carritos_productos');
  }
};
