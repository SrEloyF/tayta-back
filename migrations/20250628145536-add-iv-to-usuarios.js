'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('usuarios', 'iv', {
      type: Sequelize.STRING(255),
      allowNull: true,
      validate: {
        notEmpty: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('usuarios', 'iv');
  }
};
