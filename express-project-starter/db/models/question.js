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
    votes_id: DataTypes.INTEGER
  }, {});
  Question.associate = function(models) {
    // associations can be defined here
  };
  return Question;
};
