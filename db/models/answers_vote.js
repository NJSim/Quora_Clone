'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answers_vote = sequelize.define('Answers_vote', {
    user_id: DataTypes.INTEGER,
    answer_id: DataTypes.INTEGER
  }, {});
  Answers_vote.associate = function(models) {
    Answers_vote.belongsTo(models.Answer, { foreignKey: 'answer_id' });
    Answers_vote.belongsTo(models.User, {foreignKey: 'user_id'});

  };
  return Answers_vote;
};
