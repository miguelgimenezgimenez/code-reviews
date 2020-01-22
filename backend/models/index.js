'use strict';


const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(process.env.DATABASE_URL, {
dialect:  'postgres',
protocol: 'postgres',
logging:  (msg) => console.log('postgres: ', msg)
});

sequelize.authenticate()
  .then(() => {
    console.log('🐘: Connection to postgres  has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;