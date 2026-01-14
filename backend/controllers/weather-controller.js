

/* PREVISÃO DO TEMPO - HOJE, AMANHÃ E DEPOIS DE AMANHÃ */
const getForecast = async (req, res) => {

  const params = req.params.query;
  console.log(params)
  try {
    // const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
    //   city
    // )}&days=5&lang=pt`;
    res.send("Nothing")
  } catch (error) {
    res.send(`Error trying to recover the forecast, ${error}`);
  }

};



module.exports = {
  getForecast
}