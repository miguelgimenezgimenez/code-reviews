const got = require('got');
const cheerio = require('cheerio');

async function getHeadline() {
  try {
    const response = await got('https://www.lavanguardia.com/');
    const data = response.body;
    const $ = cheerio.load(`${data}`);
    //DATA
    const headline = $('section.breakingnews div.col-xs-12 article.tpl-story-first div.story-bottom header.story-header h1.story-header-title a.story-header-title-link').text();
    // const subtitle = $('').text(); //INSERT HTML PATH
    // const author = $('').text();   //INSERT HTML PATH
    // const place = $('').text();    //INSERT HTML PATH
    // const story = $('').text();    //INSERT HTML PATH
    // DATA-END

    return headline;
  } catch (error) {
    console.log(error.response.body);
    //=> 'Internal server error ...'
  }
};

exports.getHeadline = getHeadline;
