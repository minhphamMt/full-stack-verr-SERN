"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "minh",
        lastName: "pham",
        email: "minh@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "thu",
        lastName: "nguyen",
        email: "thunguyen@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "minh",
        lastName: "thu",
        email: "minhthu@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
