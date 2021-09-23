'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Questions_votes', [
      {
        user_id: 2,
        question_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Questions_votes', null, { 
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
