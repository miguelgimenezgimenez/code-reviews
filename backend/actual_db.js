'use strict';

const Sequelize = require('sequelize');

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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

