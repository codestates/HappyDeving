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
      "study",
      [
        {
          user_id: 1,
          content: "코린이 코딩 같이 공부하실 분 찾습니다.",
          title: "코린이와 함께",
          kakaoLink: "kakaolink.com",
          closed: false,
          location_id: 1,
          startDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          content: "코딩테스트 같이 공부할 분 찾습니다.",
          title: "코딩테스트 준비",
          kakaoLink: "kakaoshare.com",
          closed: false,
          location_id: 2,
          startDate: new Date(),
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
    await queryInterface.bulkDelete("study", null, {});
  },
};
