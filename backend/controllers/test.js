'use strict';

// MOCK DATABASE

// import model
const model = require('../test');

exports.test = async ctx => {
  try {
    ctx.body = await model.test();
    ctx.status = 200;
  } catch (e) {
    console.log('error', e);
  }
};

exports.add = async ctx => {
  try {
    console.log(ctx.request.body);
    ctx.status = 200;
  } catch (e) {
    console.log('error', e);
  }
};