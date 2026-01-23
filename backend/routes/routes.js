const router = require("express").Router();

const genToken = require("../controllers/token-controller");
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
router.get("/getToken/", genToken);

module.exports = router;
