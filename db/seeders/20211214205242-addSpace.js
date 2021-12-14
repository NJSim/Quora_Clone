"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Spaces",
      [
        {
          tag: "Actors and Actresses",
          img: "https://i.imgur.com/hES7D98.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Hollywood",
          img: "https://images.unsplash.com/photo-1581390114939-946f9a890a7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2062&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Marvel Cinematic Universe",
          img: "https://www.gannett-cdn.com/presto/2021/01/07/USAT/0d87949b-7f95-4318-a7f7-72f2b6893d05-marvel-shows.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Movie Lists",
          img: "https://i.imgur.com/JBxmIGv.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Bollywood",
          img: "https://images.unsplash.com/photo-1503160865267-af4660ce7bf2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Acting",
          img: "https://images.unsplash.com/photo-1598386651573-9232cc0c2f7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Netflix Lists Hot",
          img: "https://fdn.gsmarena.com/imgroot/news/20/10/netflix-india-free-weekend/-1200/gsmarena_001.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Oscar Winners",
          img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1718&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Movie Reviews",
          img: "https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Spanish Soap Opra",
          img: "http://ielanguages.com/blog/wp-content/uploads/2015/10/loimp.jpeg?x26507",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Latino Movies",
          img: "https://wp-denverite.s3.amazonaws.com/wp-content/uploads/sites/4/2017/09/160821-CINEMA-LATINO-KEVINJBEATY-05.gif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: "Black Leading Actors",
          img: "https://image.cnbcfm.com/api/v1/image/102129219-544fe3109623b.jpg?v=1497046818&w=1600&h=900",
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

      Example:
      */
      return queryInterface.bulkDelete('Spaces', null, {});
  },
};
