'use strict';
module.exports = (sequelize, DataTypes) => {
  const Questions_vote = sequelize.define('Questions_vote', {
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER
  }, {});
  Questions_vote.associate = function(models) {
    // associations can be defined here
    Questions_vote.belongsTo(models.Question, { foreignKey: 'question_id' });
    Questions_vote.belongsTo(models.User, {foreignKey: 'user_id'});
  };
  return Questions_vote;
};
