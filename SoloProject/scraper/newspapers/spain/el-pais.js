const got = require('got');
const cheerio = require('cheerio');

async function getHeadline() {
  try {
    const response = await got('https://elpais.com/');
    const data = response.body;
    const $ = cheerio.load(`${data}`);
    //DATA
    const headline = $('article.articulo--primero h2.articulo-titulo a').text(); //articulo-titulo)[0].innerText
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
