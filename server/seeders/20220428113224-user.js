"use strict";
const bcrypt = require("bcrypt");

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
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash("1234", salt);

    await queryInterface.bulkInsert(
      "user",
      [
        {
          username: "John Doe",
          email: "John@gmail.com",
          verified: false,
          password: hashedPassword,
          github: null,
          blog: null,
          bio: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "nikki",
          email: "nikki@gmail.com",
          verified: false,
          password: hashedPassword,
          github: null,
          blog: null,
          bio: null,
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
    // await queryInterface.bulkDelete("user", null, {});
  },
};
