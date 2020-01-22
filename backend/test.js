'use strict';

const db = require('./db').getData();


exports.test = ctx => {
  try {
    return db;
  } catch (e) {
    console.log('error in model: ', e);
  }
}