'use strict';
module.exports = (sequelize, DataTypes) => {
  const Questionspace = sequelize.define('Questionspace', {
    question_id: DataTypes.INTEGER,
    space_id: DataTypes.INTEGER
  }, {});
  Questionspace.associate = function(models) {
    // associations can be defined here
    // Questionspace.belongsTo(models.Question, { foreignKey: 'question_id' });
    // Questionspace.belongsTo(models.Space, {foreignKey: 'space_id'});
  };
  return Questionspace;
};