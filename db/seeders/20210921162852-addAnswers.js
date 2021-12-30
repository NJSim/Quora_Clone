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
      {
        user_id: 12,
        question_id: 10,
        content: 'Vicky Kaushal and Katrina Kaif tied the knot at Six Senses Fort Barwara in Sawai Madhopur on December 9.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 13,
        question_id: 10,
        content: 'Their grand wedding took place at ‘’Six Senses Fort Barwara ‘’ in Sawai Madhopur, Rajasthan.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 14,
        question_id: 11,
        content: 'I would say this answer is a bit of a “it depends” answer. As a primary lead actress, Neha Dhupia could not be said to be an A-list actress. I can only think of two successful movies of hers, where she was a lead actress, or at least one of the lead actresses (Qayamat and Kya Kool Hai Hum). Suffice to stare that that alone cannot make anyone an A-lister.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        question_id: 11,
        content: 'She has been in a lot of controversies previously as seen on the TV show Roadies. I would say that she is very moody and doesn’t give an ‘f’ about what people think about her. One thing is that she is very bold. She is not afraid to speak her mind. She is a hardcore feminist. I don’t think she is an A-list Bollywood Actress.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 12,
        content: 'Nicolas cage.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        question_id: 12,
        content: 'Sadly, I’d have to say great actors like De Niro and Pacino simply because they feel they need the money to maintain a certain lifestyle and pay alimony and child support. And Meryl Streep, who doesn’t really need the money - she just wants to keep working. I think once she hits a certain age she’ll get better scripts, like Hepburn before her.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        question_id: 13,
        content: 'There’s just honestly no comparison. Justice League was panned for a reason. It was rushed and it was a major mistake by Warner Brothers',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 5,
        question_id: 13,
        content: 'Its a tie for me, I really enjoyed both',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 6,
        question_id: 14,
        content: 'AFI 100 Years... 100 movies:http://www.afi.com/100years/movies.aspx',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 7,
        question_id: 14,
        content: 'AMC Great Films list:http://www.filmsite.org/greatlists.html',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 8,
        question_id: 15,
        content: 'selling sunset lol',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 9,
        question_id: 15,
        content: 'I really like squid games',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 10,
        question_id: 16,
        content: 'duh, she won an oscar',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 11,
        question_id: 16,
        content: 'yes! i guess so?',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 12,
        question_id: 17,
        content: 'yes! it is a beautiful masterpiece. it is a story between English Poet and his muse Fanny and the movie was named after the famouse poem that Keats wrote for Fanny',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 13,
        question_id: 18,
        content: 'Titanic!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 14,
        question_id: 18,
        content: 'Casablanca',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        question_id: 19,
        content: 'La Casa de Papel (Money Heist) – 4 seasons (2017 – present)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        question_id: 19,
        content: 'Élite (Elite) – 3 seasons (2018 – present)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        question_id: 20,
        content: 'netflix has so many spanish movies. im currentng watching "Ahí te encargo"',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        question_id: 20,
        content: 'i binge watching La llamada (Holy Camp!)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 5,
        question_id: 21,
        content: 'black panther!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 6,
        question_id: 21,
        content: 'shang chi!!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 7,
        question_id: 22,
        content: 'Donald Glover. He can be intense, crazy, chaotic, thoughtful, funny, and unpredictable. I can totally see him put on a purple suit and blow up a government building, and then the next minute points a toy gun at Batman and laugh hysterically.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 8,
        question_id: 22,
        content: 'I think Michael Jackson could have pulled it off really well. With the way he moved and sounded and if he could get a menacing laugh just right, have a musical number or two, that would have been good.',
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
