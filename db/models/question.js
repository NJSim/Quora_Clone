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
    Question.belongsTo(models.User, { foreignKey: 'user_id' });
    Question.hasMany(models.Questions_vote, { foreignKey: 'question_id', onDelete:'CASCADE', hooks:true });
    Question.hasMany(models.Answer, { foreignKey: 'question_id', onDelete:'CASCADE', hooks:true });
    const columnMapping = {
      through: "Questionspace",
      otherKey: "space_id",
      foreignKey: "question_id",
    };

    Question.belongsToMany(models.Space, columnMapping);
  };
  return Question;
};
