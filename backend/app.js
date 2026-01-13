const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const Routes = require("./routes/routes");

app.use(cors());
app.use(express.json());

app.use("/", Routes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});

// TODO - CONTINUAR O WEATHER APP/API
// TODO - LEMBRE-SE, SÓ O BACKEND, PARA APRENDER A PROFISSIONALIZAR OQUE FAZ, USANDO INSOMNIA, COM SEGURANÇA ETC...


