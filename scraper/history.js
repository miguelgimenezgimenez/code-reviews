// works for one day: how can i iterate over the year?

const got = require('got');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// do this month by month: if not it will crash

const daysinMonths = {
  January: 31,
  February: 29,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
};

for (month in daysinMonths) {
  const days = daysinMonths[month];
  for (let i = 1; i <= days; i++) {
    if (i < 10) {
      i = '0' + i.toString();
    }
    const url = `https://www.historynet.com/today-in-history/${month}-${i}`;

    (async () => {
      try {
        const response = await got(url);
        const $ = cheerio.load(response.body);

        const date = $('header meta').attr('content');
        const formattedDate = date.slice(-5);

        const historyFacts = []
        $('main p').each(function (i, el) {
          historyFacts[i] = { date: formattedDate, fact: $(el).text(), interests: ['history', 'general'] };
        });
        historyFacts.shift();

        $('h3[itemprop="startDate"]').each(function (i, el) {
          historyFacts[i].year = $(this).text()
        });

        const makeRequest = async function () {
          console.log(historyFacts);
          await fetch(`http://intense-sierra-66192.herokuapp.com/facts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(historyFacts)
          });
        }

        makeRequest();

      } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
      }
    })();
  }
};
