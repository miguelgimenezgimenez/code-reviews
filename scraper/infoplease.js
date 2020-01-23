const got = require('got');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const months = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
};

const daysinMonths = {
  january: 31,
  february: 29,
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  september: 30,
  october: 31,
  november: 30,
  december: 31,
};

for (month in daysinMonths) {
  const days = daysinMonths[month];
  for (let i = 1; i <= days; i++) {
    if (i < 10) {
      i = '0' + i.toString();
    }

    const url = `https://www.infoplease.com/dayinhistory/${month}-${i}`;

    (async () => {
      try {
        const response = await got(url);
        const $ = cheerio.load(response.body);

        // to format the date for the database i.e. january becomes 01

        const writtenDateArray = url.match(/y\/.+/g)[0].replace('y/', '').split('-');
        for (month in months) {
          if (month === writtenDateArray[0]) {
            writtenDateArray[0] = months[month];
          }
        }
        formattedDate = writtenDateArray.join('-');

        const infoPleaseFacts = []
        $('ul[class="features links"] p').each(function (i, el) {
          infoPleaseFacts[i] = { date: formattedDate, fact: $(el).text(), interests: ['history', 'general'] };
        });
        infoPleaseFacts;

        $('li h3').each(function (i, el) {
          infoPleaseFacts[i].year = $(this).text()
        });

        const firstFactWrapper = [];

        $('div[class="dih-out-wrap"] p').each(function (i, el) {
          firstFactWrapper[i] = $(this).text()
        })

        const firstFactYear = $('div[class="dih-out-wrap"] div[class="dih-history-year"]').text();

        firstFact = { year: firstFactYear, fact: firstFactWrapper.pop(), interests: ['history'] };

        infoPleaseFacts.unshift(firstFact);

        const makeRequest = async function () {
          console.log(infoPleaseFacts);
          await fetch(`http://intense-sierra-66192.herokuapp.com/facts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(infoPleaseFacts)
          });
        }

        makeRequest();

        console.log(infoPleaseFacts);

      } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
      }
    })();

  }
};