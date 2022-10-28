import '../env.js';

// Needed for require to work in esm application
import {createRequire} from 'module';
const require = createRequire(import.meta.url);

const request = require('postman-request');

import path from 'path';
import {fileURLToPath} from 'url';
import express from 'express';
import hbs from 'hbs';

// ESM specific features
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const creator = 'El Yorsh';

// Setup handlers engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    creator
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    creator
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    creator
  });
});

app.get('/weather', (req, res) => {
  const cityParam = req.query?.city;
  const apiUrl = process.env.WEATHER_API_URL;
  const key = process.env.WEATHER_API_KEY;
  const units = process.env.WEATHER_UNITS_FAHRENHEIT;
  const url = `${apiUrl}?access_key=${key}&query=${cityParam}&units=${units}`;

  if (!cityParam) {
    return res.send({
      error: 'You must provide city'
    })
  }

  request({url, json: true}, (error, response) => {
    if (error) {
      return res.send({
        error: 'Unable to get weather data.'
      });
    }

    if (response.body.error) {
      return res.send({
        error: 'Unable to find location. Try another search.'
      });
    }

    res.send(response);
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  res.send({products: [{fruit: "apple"}]});
});

app.get('/help/*', (req, res) => {
  res.send('Help article not found');
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'oops! 404',
    creator: 'Jorge Carmona',
    error: 'Missing page'
  });
})

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});