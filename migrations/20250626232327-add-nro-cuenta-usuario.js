'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'nro_cuenta', {
      type: Sequelize.STRING(255),
      allowNull: true,
      validate: {
        notEmpty: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'nro_cuenta');
  }
};
