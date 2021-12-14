"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkInsert(
      "Spaces",
      [
        {
          question_id: 1,
          tag: "Actors and Actresses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 1,
          tag: "Hollywood",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 1,
          tag: "Marvel Cinematic Universe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 1,
          tag: "Movie Lists",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 2,
          tag: "Bollywood",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          question_id: 2,
          tag: "Acting",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 2,
          tag: "Netflix Lists Hot",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 2,
          tag: "Oscar Winners",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 3,
          tag: "Movie Reviews",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 3,
          tag: "Spanish Soap Opra",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 3,
          tag: "Latino Movies",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 3,
          tag: "Black Leading Actors",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 4,
          tag: "Actors and Actresses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 4,
          tag: "Hollywood",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 4,
          tag: "Marvel Cinematic Universe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 4,
          tag: "Movie Lists",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 5,
          tag: "Bollywood",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          question_id: 5,
          tag: "Acting",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 5,
          tag: "Netflix Lists Hot",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 5,
          tag: "Oscar Winners",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 6,
          tag: "Movie Reviews",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 6,
          tag: "Spanish Soap Opra",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 6,
          tag: "Latino Movies",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 6,
          tag: "Black Leading Actors",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 7,
          tag: "Actors and Actresses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 7,
          tag: "Hollywood",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 7,
          tag: "Marvel Cinematic Universe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 7,
          tag: "Movie Lists",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 8,
          tag: "Bollywood",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
        {
          question_id: 8,
          tag: "Acting",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 8,
          tag: "Netflix Lists Hot",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 9,
          tag: "Oscar Winners",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 9,
          tag: "Movie Reviews",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 9,
          tag: "Spanish Soap Opra",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 7,
          tag: "Latino Movies",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          question_id: 7,
          tag: "Black Leading Actors",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("Spaces", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
