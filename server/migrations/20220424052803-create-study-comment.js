"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("study_comment", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        study_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        parentId: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint("study_comment", {
          type: "FOREIGN KEY",
          name: "FK_study_comment_study",
          fields: ["study_id"],
          references: {
            table: "study",
            field: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        })
      );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("study_comment");
  },
};
