const factModel = require('../models/fact-model');

async function getFact (ctx) {
  const date = ctx.url.slice(-5);
  const obj = { date: date };
  if (!ctx || date.includes('/') || date === '02-30' || date === '02-31' || date === '04-31' || date === '06-31' || date === '09-31' || date === '11-31') {
    ctx.status = 404;
    return ctx.response.body = "Incorrect url. Check the date."
  };
  try {
    ctx.body = await factModel.getFact(obj);
    ctx.status = 200;
  } catch (error) {
    console.error(error);
    ctx.status = 400;
  }
}

async function postFact (ctx) {
  try {
    const fact = await factModel.postFact(ctx.request.body);
    ctx.status = 201;
    ctx.response.body = fact;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
}

module.exports = {
  getFact,
  postFact
};