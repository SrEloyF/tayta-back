'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('compras');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createTable('compras', {
      id_compra: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      estado: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      precio_establecido: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      porcentaje: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    });
  }
};
