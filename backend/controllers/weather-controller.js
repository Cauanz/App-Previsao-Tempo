const axios = require("axios");
const { weatherApiDailyForecast } = require("../providers/weatherApi");
const client = require("../providers/cache.provider");

const autocomplete = async (req, res) => {
  // TODO - ROTA PARECIDA COM A DE BAIXO, MAS RESPONSE A TODA HORA, COM CADA ENTRADA/REQUEST
  return;
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

    // - BUSCA EM CACHE, SE NÃO, FAZ O REQUEST (IF)
    const cacheRes = await client.hGetAll(cityName + days);

    // console.log(JSON.stringify(cacheRes));
    if (Object.keys(cacheRes).length !== 0) {
      res.send(cacheRes);
      return;
    }

    const requestJson = await weatherApiDailyForecast(cityName, days);
    console.log(requestJson);

    // - ESPERA E VALIDA RESPOSTA
    if (!requestJson) {
      res.send({ message: "An error ocurred with the request", status: 500 });
      return;
    }

    // - ARMAZENA EM CACHE
    await client.hSet(cityName + days, requestJson);

    // - RESPONDE
    // TODO - NÃO FUNCIONANDO, DIZENDO ALGO DE ERRO DE BUFFER/ARGUMENTS
    res.send(requestJson);
  } catch (error) {
    res.send(`Error trying to recover the forecast, ${error}`);
  }
};

module.exports = {
  getForecast,
};
