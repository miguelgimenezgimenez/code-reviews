'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_extended = sequelize.define('User_extended', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    confirmpass: DataTypes.STRING,
    picture: DataTypes.STRING,
    gender: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  User_extended.associate = function(models) {
    // associations can be defined here
  };
  return User_extended;
};