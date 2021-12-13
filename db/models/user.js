'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_name: DataTypes.STRING(50),
    email: DataTypes.STRING(255),
    occupation: DataTypes.STRING(100),
    hashed_password: DataTypes.STRING(255),
    profile_picture: DataTypes.STRING(255)
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Question, { foreignKey: 'user_id' });
    User.hasMany(models.Answer, { foreignKey: 'user_id' });
    User.hasMany(models.Questions_vote, { foreignKey: 'user_id' });
    User.hasMany(models.Answers_vote, { foreignKey: 'user_id' });
  };
  return User;
};
