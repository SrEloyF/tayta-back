'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('items', 'descripcion', {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('items', 'descripcion');
  }
};
