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
        user_id: 6,
        title: "Will Friends ever get a movie adaptation or have I never heard of it?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 7,
        title: "What is everyone's favorite Simpsons character - I love BART!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 8,
        title: "What is everyone's obsession with movies? So annoying...",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 9,
        title: "I love every movie but what is your favorite movie by far??",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 10,
        title: "I'm sorta young, but what are great movies before I was born? (2004)",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 11, //6th question id
        title: "What will happen to me if I watch movies 20 hours a day? I feel fine sleeping 4 hours a day",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 9,
        title: "Would you guys recommend Ratatouille?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 9,
        title: "I'm so glad I found this app, love this community!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        title: "What are all the movies that you can think of with the word 'water' in it?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        title: "What is the city where Katrina Kaif and Vicky Kaushal get married?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        title: "Is Neha Dhupia still an A-list Bollywood actress?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        title: "Can you think of a great actor who is consistently in bad films?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        title: "Which movie was better, Avengers: Infinity War or Justice League?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        title: "What are the best top movie lists? Why?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 5,
        title: "what is your favorite netflix shows",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 6,
        title: "Is Jennifer Lawrance hollywood A-list star",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 7,
        title: "has anyone watched the movie 'Bright Star'?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 8,
        title: "which Oscar winning movie you like?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 8,
        title: "any spanish telenovas on Netflix?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 9,
        title: "any movies that i can practice my spanish?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 10,
        title: "super hero movies for minority groups?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 11,
        title: "Which black actor could you see playing the Joker successfully?",
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
    return queryInterface.bulkDelete('Questions', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  }
};
