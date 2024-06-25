var unirest = require('unirest');
var request = require('request');

async function getCrrencyRate(currency) {
  var options = {
    method: 'GET',
    url: `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${process.env.CURRENCY_APIKEY}&symbols=${currency}`,
    headers: {},
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) {
        reject(error);
      } else {
        const responseBody = JSON.parse(response.body);
        const currencyValue = Number(responseBody.rates[currency]);
        resolve(currencyValue.toFixed(2));
      }
    });
  });
}
module.exports = getCrrencyRate;
