const router = require("express").Router();

const { getForecast } = require("../controllers/weather-controller");


router.get("/", (req, res) => {
  console.log("Funcionando pelo Docker!");
});

// TODO - CONTINUAR A PRIMEIRA ROTA, LEMBRE-SE DE MIDDLEWARES, AUTENTICAÇÃO ETC...
//! NÃO FUNCIONANDO
router.get("/weather/:query", getForecast);

module.exports = router;
