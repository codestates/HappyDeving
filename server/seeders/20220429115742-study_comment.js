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
      "study_comment",
      [
        {
          user_id: 1,
          study_id: 2,
          content: "좋습니다!",
          parentId: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          study_id: 1,
          content: "저도 같이 하고싶습니다!",
          parentId: null,
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
    // await queryInterface.bulkDelete("study_comment", null, {});
  },
};
