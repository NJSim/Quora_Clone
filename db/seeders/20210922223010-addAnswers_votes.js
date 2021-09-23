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
    return queryInterface.bulkInsert('Answers_votes', [
      {
        user_id: 2,
        answer_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        answer_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        answer_id: 3,
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
    return queryInterface.bulkDelete('Answers_votes', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
