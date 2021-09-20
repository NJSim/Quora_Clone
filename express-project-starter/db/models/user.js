'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_name: DataTypes.STRING(50),
    email: DataTypes.STRING(255),
    occupation: DataTypes.STRING(100),
    hashed_password: DataTypes.STRING(255)
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
