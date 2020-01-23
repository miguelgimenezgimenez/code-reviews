const got = require('got');
const cheerio = require('cheerio');

async function getHeadline() {
  try {
    const response = await got('https://www.expansion.com/');
    const data = response.body;
    const $ = cheerio.load(`${data}`);
    //DATA-START
    const headline = $('h2.flex-article__heading a.flex-article__heading-link').first().text();
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



//     li.flex__item--4-1    .flex-article__container