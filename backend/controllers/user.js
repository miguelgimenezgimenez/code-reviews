'use strict';

const bcrypt = require('bcrypt');
const db = require('../models/index');


exports.createUser = async ctx => {
  
  const defaultUserProfilePic = 'https://roomi-images.s3.eu-west-3.amazonaws.com/profile_pics/default_user.png';
  const user = ctx.request.body;
  
  try {
    if (!user.profile_pic) user.imageUrl = defaultUserProfilePic;
    user.hashedPassword = await bcrypt.hash(user.password, 10);

    ctx.body = await db.User.create({
      email: user.email,
      password: user.hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      phone_number: user.phone_number,
      profile_pic: user.profile_pic,
      shadow_user: false
    });
    ctx.status = 201;
  } catch (e) {
    console.log('error creating user: ', e);
    ctx.status = 400;
  }
};

exports.loginUser = async ctx => {
  
  const loginData = ctx.request.body;
  
  try {
    const userData = await db.User.findAll({
      where: {
        email: loginData.email
      }
    });

    if (userData.length && !userData[0].dataValues.shadow) {
      
      const correctPassword = await bcrypt
        .compare(loginData.password, userData[0].dataValues.password);
      if (correctPassword) {
        ctx.body = {
          id: userData[0].dataValues.id,
          email: userData[0].dataValues.email,
          firstName: userData[0].dataValues.firstName,
          lastName: userData[0].dataValues.lastName,
          phone_number: userData[0].dataValues.phone_number,
          profile_pic: userData[0].dataValues.profile_pic
        };
        ctx.status = 202;

      } else {
        ctx.body = 'Incorrect password';
        ctx.status = 401;
      }

    } else {
      ctx.body = 'User / Email not found';
      ctx.status = 403;
    }

  } catch (e) {
    console.log('error login in user: ', e);
  }
};

exports.addUserImage = async ctx => {
  const profileImageUrl = ctx.files[0].location;
  ctx.body = profileImageUrl;
  ctx.status = 201;
};





