'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('motivos_denuncia', {
      id_motivo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING(55)
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('motivos_denuncia');
  }
};