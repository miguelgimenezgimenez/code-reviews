const mongoose = require('mongoose');
const config = require('./config')

const mongoUrl = config.MONGO_URI;

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:')); // eslint-disable-line no-console
db.once('open', () => {
  console.log('Database connected! 💾'); // eslint-disable-line no-console
});