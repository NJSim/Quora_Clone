'use strict';
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    user_id: DataTypes.INTEGER,
    title: {
      type: DataTypes.TEXT,
      validate: {
        max: 1000,
      }
    },
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
    /*
    One question belongs to one user
    One user has many questions
    */

    Question.belongsTo(models.User, { foreignKey: 'user_id' });
    Question.hasMany(models.Questions_vote, { foreignKey: 'question_id' });

  };
  return Question;
};
