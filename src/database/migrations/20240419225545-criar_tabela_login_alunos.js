'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('alunos', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'email@example.com', // Defina um valor padrão adequado
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('alunos', 'email');

    await queryInterface.removeColumn('alunos', 'password');
  }
};