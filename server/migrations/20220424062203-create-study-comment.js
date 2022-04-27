"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("study_comment", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "user", key: "id" },
      },
      study_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "study", key: "id", onDelete: "cascade" },
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      parentId: {
        type: Sequelize.INTEGER,
        defaultValue: null,
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
    await queryInterface.dropTable("study_comment");
  },
};
