"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("study", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kakaoLink: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      closed: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      location_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("study");
  },
};
