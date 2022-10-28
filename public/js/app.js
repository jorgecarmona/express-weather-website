const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const temperature = document.querySelector('#temperature');
const feelsLike = document.querySelector('#feels-like');
const loc = document.querySelector('#location');
  
weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const searchValue = search.value;
  const error = document.querySelector('#error');
  
  const response = await fetch(`http://localhost:3000/weather?city=${searchValue}`);
  const data = await response.json();
  
  if (data.error) {
    error.textContent = data.error;
    return;
  }
  
  const {current, location} = data.body;

  error.textContent = '';
  temperature.textContent = current.temperature;
  loc.textContent = `${location.name}, ${location.region}, ${location.country}`;
});