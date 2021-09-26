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
    return queryInterface.bulkInsert('Answers', [
      {
        user_id: 7,
        question_id: 1,
        content: 'Not sure, but I love the simpsons!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 8,
        question_id: 1,
        content: 'Dude thats a tv series why are you here? even if it did get a movie adaptation it would suck',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 9,
        question_id: 1,
        content: 'Im pretty sure there is no movie- I feel like I would have watched it',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 10,
        question_id: 1,
        content: 'What is friends? I love star wars 7 though!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 8,
        question_id: 2,
        content: 'This was barely a movie, anyways I hate it',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 9,
        question_id: 3,
        content: 'You should learn to love movies, theres a beauty in every single one of them',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 6,
        question_id: 4,
        content: 'Honestly I would recommend the older star wars movies!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 7,
        question_id: 4,
        content: 'Dude, Simpsons movies are SOOOO good, trust me!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 8,
        question_id: 4,
        content: 'Save yourself the trouble and just play games or something',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 7,
        content: 'DUDE! I love ratatouille it is my absolute favorite movie!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        question_id: 6,
        content: 'Thats very dangerous',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 6,
        question_id: 8,
        content: 'SAME! I love friends btw if you didnt know that haha',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 7,
        question_id: 5,
        content: 'I would recommend Simpsons: the movie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 8,
        question_id: 5,
        content: 'Please dont watch any',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 11,
        question_id: 8,
        content: 'ME TOO!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 12,
        question_id: 9,
        content: 'Like water world? ',
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
      return queryInterface.bulkDelete('Answers', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
      });
  }
};
