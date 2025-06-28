'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id_usuario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url_img: {
        type: Sequelize.STRING(255)
      },
      nombres: {
        type: Sequelize.STRING(55)
      },
      apellidos: {
        type: Sequelize.STRING(55)
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true
      },
      contrasena: {
        type: Sequelize.STRING(255)
      },
      telefono: {
        type: Sequelize.STRING(20)
      },
      fecha_y_hora: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
