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
    return queryInterface.bulkInsert('Questions', [
      {
        user_id: 1,
        title: "This is first question?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        title: "This is second question?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        title: "This is third question?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        title: "This is fourth question?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        title: "This is fifth question?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        title: "This is sixth question?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        title: "This is seventh question?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        title: "This is eighth question?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 5,
        title: "This is nineth question?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 5,
        title: "This is tenth question?",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Questions', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
