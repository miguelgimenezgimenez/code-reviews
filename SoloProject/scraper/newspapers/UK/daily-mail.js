const got = require('got');
const cheerio = require('cheerio');

async function getHeadline() {
  try {
    const response = await got('https://www.dailymail.co.uk/home/index.html');
    const data = response.body;
    const $ = cheerio.load(`${data}`);
    //DATA-START
    const headline = $('h2.linkro-darkred a').first().text();
    // const subtitle = $('').html(); //INSERT HTML PATH
    // const author = $('').html();   //INSERT HTML PATH
    // const place = $('').html();    //INSERT HTML PATH
    // const story = $('').html();    //INSERT HTML PATH
    // DATA-END

    return headline;
  } catch (error) {
    console.log(error.response.body);
    //=> 'Internal server error ...'
  }
};

exports.getHeadline = getHeadline;