const router = require("express").Router();

const getToken = require("../controllers/token-controller");
const {
  getForecast,
  getAutocomplete,
} = require("../controllers/weather-controller");

router.get("/", (req, res) => {
  res.send("Funcionando pelo Docker!");
});

// TODO - CONTINUAR A PRIMEIRA ROTA, LEMBRE-SE DE MIDDLEWARES, AUTENTICAÇÃO ETC...
//* FUNCIONA, É PORQUE O INSOMNIA "QUERY" NÃO FUNCIONA, MAS MANUALMENTE NA BARRA DE URL FUNCIONA
router.get("/weather/", getForecast);
router.get("/autocomplete/", getAutocomplete);
router.post("/getToken/", getToken);
// TODO - AGORA QUE LEMBREI, PARA TER UM TOKEN, VOCE PRECISA DE ALGUMA FORMA DE VALIDAR ELE (NA MINHA CABEÇA A ÚNICA FORMA É BUSCANDO SE O USER DO TOKEN EXISTE EM ALGUM DB)

module.exports = router;
