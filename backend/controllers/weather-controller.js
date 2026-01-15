const axios = require("axios");
const { weatherApiDailyForecast } = require("../providers/weatherApi");

const autocomplete = async (req, res) => {
  // TODO - ROTA PARECIDA COM A DE BAIXO, MAS RESPONSE A TODA HORA, COM CADA ENTRADA/REQUEST
  return
}

/* PREVISÃO DO TEMPO - HOJE, AMANHÃ E DEPOIS DE AMANHÃ */
const getForecast = async (req, res) => {
  const query = req.query.query;
  // console.log(query)

  // TODO - PEGA QUERY DE NOME DE CIDADE (AUTOCOMPLETE SERÁ OUTRA ROTA PARECIDA)
  // TODO - VALIDA ENTRADA (TIPOS, TAMANHO, SE TODAS ENTRADAS NECESSÁRIAS EXISTEM ETC...)
  // TODO -  ADICIONAR MAIS OPÇÕES NO FUTURO

  try {
    // const city = query == PEGA A CIDADE DA QUERY
    // const days = ddd === PEGA OS DIAS DA QUERY OU NADA

    // TODO - BUSCA EM CACHE, SE NÃO, FAZ O REQUEST (IF)

    const request = await weatherApiDailyForecast(Paris);
    console.log(request);

    // TODO - ESPERA E VALIDA RESPOSTA
    // TODO - ARMAZENA EM CACHE
    // TODO - RESPONDE

    res.send(res);
  } catch (error) {
    res.send(`Error trying to recover the forecast, ${error}`);
  }
};


module.exports = {
  getForecast
}