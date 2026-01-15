const weatherApiDailyForecast = async (city, Ndays) => {
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${
    process.env.WEATHER_API_KEY
  }&q=${city}&days=${Ndays || 3}&lang=pt`;
  const res = await axios.get(forecastUrl);

  const data = await res;
  return data;
};

module.exports = {
  weatherApiDailyForecast,
};
