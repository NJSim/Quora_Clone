"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Questionspaces",
      [
        {
          space_id: 1,
          question_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 1,
          question_id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 1,
          question_id: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 1,
          question_id: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 1,
          question_id: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 1,
          question_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 2,
          question_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 2,
          question_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 2,
          question_id: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 2,
          question_id: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 2,
          question_id: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 2,
          question_id: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 2,
          question_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 2,
          question_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 3,
          question_id: 13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 3,
          question_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 4,
          question_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 4,
          question_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 4,
          question_id: 14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 4,
          question_id: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 4,
          question_id: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 4,
          question_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 5,
          question_id: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 5,
          question_id: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 6,
          question_id: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 6,
          question_id: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 6,
          question_id: 12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 6,
          question_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 7,
          question_id: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 7,
          question_id: 19,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 8,
          question_id: 18,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 8,
          question_id: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 9,
          question_id: 17,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 9,
          question_id: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 9,
          question_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 10,
          question_id: 19,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 10,
          question_id: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 11,
          question_id: 20,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 12,
          question_id: 22,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          space_id: 12,
          question_id: 21,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
       
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete("Questionspaces", null, {});
  },
};
