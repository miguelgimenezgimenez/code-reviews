// works for one day: how do i iterate over the whole year?

const got = require('got');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// do this month by month and interest by interest ---> otherwise it will crash

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

const themes = ['film-tv', 'sport']

const todaysEventsFacts = [];

for (let j = 0; j < themes.length; j++) {
  for (month in daysinMonths) {
    const days = daysinMonths[month];
    for (let i = 1; i <= days; i++) {
      const url = `https://www.onthisday.com/${themes[j]}/events/${month}/${i}`;
      (async () => {
        try {
          const response = await got(url);
          const $ = cheerio.load(response.body);

          const date = $('time').attr('datetime');

          if (date.length === 4) formattedDate = '0' + date;
          else formattedDate = date;

          const interest = url.match(/m\/.+\/e/g)[0].replace('m/', '').replace('/e', '');

          $('li[class="event"]').each(function (i, el) {
            todaysEventsFacts.push({ date: formattedDate, fact: $(el).text().slice(5), year: $(el).text().slice(0, 4), interests: [interest, 'general'] });
          });

          console.log(todaysEventsFacts);

          const makeRequest = async function () {
            // console.log(todaysEventsFacts);
            await fetch(`http://intense-sierra-66192.herokuapp.com/facts`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(todaysEventsFacts)
            });
          }

          makeRequest();

        } catch (error) {
          console.log(error.response.body);
          //=> 'Internal server error ...'
        }
      })();
    }
  }
};


