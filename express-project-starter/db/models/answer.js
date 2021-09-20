'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  }, {});
  Answer.associate = function(models) {
    // associations can be defined here
    Answer.belongsTo(models.User, { foreignKey: 'user_id' });
    Answer.hasMany(models.Answers_vote, { foreignKey: 'answer_id' });
  };
  return Answer;
};
