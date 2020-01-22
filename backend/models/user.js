'use strict';


module.exports = (sequelize, DataTypes) => sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fb_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  shadow_user: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  profile_pic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  own_listings: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true
  },
  favorite_listings: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true
  }
});


