const mongoose = require('mongoose');
const db = require('../db');

const Schema = mongoose.Schema;


const factSchema = new Schema({
  date: String,
  year: String,
  fact: String,
  interests: [String]
})

const factModel = mongoose.model('fact', factSchema);

async function getFact (obj) {
  const fact = await factModel.find({ date: obj.date });
  return fact;
}

const postFact = function (input) {
  try {
    if (input.length) {
      input.forEach(function (fact) {
        if (fact.date && fact.fact && fact.interests && fact.year) {
          const Fact = new factModel(fact);
          Fact.save();
          console.log('Fact inserted!')
        }
      });
    } else {
      if (!input.date || !input.fact || !input.interests || !input.year) {
        ctx.status = 400;
        return ctx.response.body = 'At least one of the required fields are missing.';
      }
      const Fact = new factModel(input);
      Fact.save();
      console.log('Fact inserted!')
    }
    return input;
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
}

module.exports = {
  getFact,
  postFact,
  factModel
};

