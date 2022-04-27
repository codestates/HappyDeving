"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("study_language", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      study_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "study", key: "id" },
      },
      language_id: {
        type: Sequelize.INTEGER,
        references: { model: "language", key: "id" },
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
    await queryInterface.dropTable("study_language");
  },
};
