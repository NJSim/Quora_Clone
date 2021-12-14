"use strict";
module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define(
    "Space",
    {
      tag: DataTypes.STRING,
      img: DataTypes.TEXT,
    },
    {}
  );
  Space.associate = function (models) {
    // associations can be defined here
    const columnMapping = {
      through: "Questionspace",
      otherKey: "question_id",
      foreignKey: "space_id",
    };

    Space.belongsToMany(models.Question, columnMapping);
  };
  return Space;
};
