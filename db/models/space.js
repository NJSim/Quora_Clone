'use strict';
module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('Space', {
    tag: DataTypes.STRING,
    question_id: DataTypes.INTEGER
  }, {});
  Space.associate = function(models) {
    // associations can be defined here
    Space.belongsTo(models.Question, { foreignKey: "question_id" });
  };
  return Space;
};