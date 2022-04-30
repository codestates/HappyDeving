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
      "location",
      [
        {
          name: "스타벅스",
          roadAddress: "한남동 154-1길",
          latitude: "37.5334",
          longitude: "127.0057",
          city: "서울시",
          guType: "용산구",
          dongType: "한남동",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "파스쿠찌",
          roadAddress: "이태원로 272",
          latitude: "37.5387",
          longitude: "127.002",
          city: "서울시",
          guType: "용산구",
          dongType: "한남동",
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
    await queryInterface.bulkDelete("location", null, {});
  },
};
