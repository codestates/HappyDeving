"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("location", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      roadAddress: {
        type: Sequelize.STRING,
      },
      latitude: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      longitude: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      guType: {
        type: Sequelize.STRING,
      },
      dongType: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("location");
  },
};
