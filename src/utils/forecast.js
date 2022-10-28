// Needed for require to work in esm application
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

const request = require('postman-request');

function forecast (city, callback) {
  const apiUrl = process.env.WEATHER_API_URL;
  const key = process.env.WEATHER_API_KEY;
  const units = process.env.WEATHER_UNITS_FAHRENHEIT;
  const url = `${apiUrl}?access_key=${key}&query=${city}&units=${units}`;

  request({url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to get weather data.', undefined);
    } else if (response.body.error) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, response);
    }
  });
};

export default forecast;