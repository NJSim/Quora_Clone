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
    return queryInterface.bulkInsert('Users', [
      {
        user_name: 'DemoUser',
        email: 'demoUser@demoUser.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/quora_avatar.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'nick123',
        email: 'nick@nick.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/nick.JPG',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'jack123',
        email: 'jack@jack.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/jack.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'jessi123',
        email: 'jessi@jessi.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/jessi.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'kristy123',
        email: 'kristy@kristy.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/kristy.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'ILoveFriends90', //6th id user
        email: 'rosschandler@friends.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/ILoveFriends90.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'Simpsons4Life',
        email: 'bartsimpson@simpsons.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/Simpson4LIfe.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'IhateAllMovies',
        email: 'hater@haters.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/IhateAllMovies.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'LoveThatMovie4Real',
        email: 'movielover@gmail.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/LoveThatMovie4Real.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'yay1999',
        email: 'youngguy@gmail.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/yay1999.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'moviesAllday',
        email: 'movielover2@gmail.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/moviesAllday.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'MovieExpert2',
        email: 'movieexpert@gmail.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/MovieExpert2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'DemoUser2',
        email: 'demoUser2@demoUser.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/quora_avatar.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'DemoUser3',
        email: 'demoUser3@demoUser.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        profile_picture: 'https://wyl-mora.s3.us-west-1.amazonaws.com/quora_avatar.png',
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
      return queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
      });
  }
};
