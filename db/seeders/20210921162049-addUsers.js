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
        user_name: 'demoUser',
        email: 'demoUser@demoUser.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'nick123',
        email: 'nick@nick.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'jack123',
        email: 'jack@jack.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'jessi123',
        email: 'jessi@jessi.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_name: 'kristy123',
        email: 'kristy@kristy.com',
        hashed_password: '$2a$10$Ynt8Q9MAlBIWpv1pEA/TNeDqtWp0sMoB6caPxZ.gFEiTU50VDNYZy',
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
      return queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
      });
  }
};
