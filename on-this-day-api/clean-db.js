const models = require('./models/fact-model')

async function cleanDb () {
  const found = await models.factModel.find({ $expr: { $lt: [{ $strLenCP: 'fact' }, 2] } }); // has length less than 1
  console.log(found);
  const found1 = await models.factModel.find({ year: { $exists: false } });
  console.log(found1); // has no year
  const found2 = await models.factModel.find({ fact: ' ' });
  console.log(found2); // where fact is just a space
}

cleanDb();

// can also run this query in Robo 3T