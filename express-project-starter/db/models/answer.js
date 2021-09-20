'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    votes_id: DataTypes.INTEGER
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
  };
  return Answer;
};
