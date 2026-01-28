const {
  weatherApiDailyForecast,
  autocompleteWeather,
} = require("../providers/weatherApi");
const client = require("../providers/cache.provider");
const { formatForecastJSON } = require("../functions/weatherForecast.function");

const getAutocomplete = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    res.send({ message: "Query invalid or not found", status: 500 });
  }

  try {
    const requestJSON = await autocompleteWeather(query);
    res.send(requestJSON);
  } catch (error) {
    res.send(`Error searching for the specified query, ${error}`);
  }
};

/* PREVISÃO DO TEMPO - HOJE, AMANHÃ E DEPOIS DE AMANHÃ */
const getForecast = async (req, res) => {
  const cityName = req.query.city;
  const daysQ = req.query.d;

  // TODO - PEGA QUERY DE NOME DE CIDADE (AUTOCOMPLETE SERÁ OUTRA ROTA PARECIDA)
  // TODO - VALIDA ENTRADA (TIPOS, TAMANHO, SE TODAS ENTRADAS NECESSÁRIAS EXISTEM ETC...)
  // TODO -  ADICIONAR MAIS OPÇÕES NO FUTURO

  if (!cityName || typeof cityName !== "string") {
    return res.send({
      status: 500,
      message: "The city name is invalid or was not found",
    });
  }

  try {
    // PEGA OS DIAS DA QUERY OU DEFAULT
    const days = daysQ || 3;
    const Reqkey = cityName + days;

    // - BUSCA EM CACHE, SE NÃO, FAZ O REQUEST (IF)
    const cacheRes = await client.hGetAll(Reqkey);

    if (Object.keys(cacheRes).length !== 0) {
      const formattedCache = formatForecastJSON(JSON.parse(cacheRes.data));
      res.send(formattedCache);
      return;
    }

    const requestJson = await weatherApiDailyForecast(cityName, days);

    // - ESPERA E VALIDA RESPOSTA
    if (!requestJson) {
      res.send({ message: "An error ocurred with the request", status: 500 });
      return;
    }

    // - ARMAZENA EM CACHE
    await client.hSet(Reqkey, "data", JSON.stringify(requestJson));

    // - TRATA RESPOSTA PARA RESPONDER MENOS E COISAS MAIS CONCISAS
    const formattedForecast = formatForecastJSON(requestJson);

    // - RESPONDE
    res.send(formattedForecast);
  } catch (error) {
    res.send(`Error trying to recover the forecast, ${error}`);
  }
};

module.exports = {
  getForecast,
  getAutocomplete,
};
