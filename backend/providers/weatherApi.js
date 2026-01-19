const { default: axios } = require("axios");

const weatherApiDailyForecast = async (city, Ndays) => {
  const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=${Ndays}&lang=pt`;

  try {
    const req = await axios.get(forecastUrl);
    const data = await req.data;

    return data;
  } catch (error) {
    return `An error ocurred trying to process the request, ${error}`;
  }
};

const autocompleteWeather = async (q) => {
  const autocompleteURL = `http://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}&q=${q}&lang=pt`;

  try {
    const req = await axios.get(autocompleteURL);
    const data = await req.data;

    return data;
  } catch (error) {
    return `An error ocurred trying to process the request, ${error}`;
  }
};

module.exports = {
  weatherApiDailyForecast,
  autocompleteWeather,
};
