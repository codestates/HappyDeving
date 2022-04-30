"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "language",
      [
        {
          name: "javascript",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "java",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "python",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "c++",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "typescript",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "react",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "swift",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "go",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "nodejs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("language", null, {});
  },
};
