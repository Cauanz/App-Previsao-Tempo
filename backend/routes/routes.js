const router = require("express").Router();

const { getForecast } = require("../controllers/weather-controller");


router.get("/", (req, res) => {
  res.send("Funcionando pelo Docker!");
});

// TODO - CONTINUAR A PRIMEIRA ROTA, LEMBRE-SE DE MIDDLEWARES, AUTENTICAÇÃO ETC...
//* FUNCIONA, É PORQUE O INSOMNIA "QUERY" NÃO FUNCIONA, MAS MANUALMENTE NA BARRA DE URL FUNCIONA
router.get("/weather/:query", getForecast);

module.exports = router;
