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
      "study_language",
      [
        {
          study_id: 1,
          language_id: 1,
        },
        {
          study_id: 1,
          language_id: 2,
        },
        {
          study_id: 1,
          language_id: 3,
        },
        {
          study_id: 2,
          language_id: 5,
        },
        {
          study_id: 1,
          language_id: 7,
        },
        {
          study_id: 1,
          language_id: 8,
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
    // await queryInterface.bulkDelete("study_language", null, {});
  },
};
