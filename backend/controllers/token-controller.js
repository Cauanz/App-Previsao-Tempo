const crypto = require("crypto")
const fs = require("fs");

const genToken = async (req, res) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");

    if (!token) {
      res.send({
        message: "An error occurred when trying to create the token",
        status: 400,
      });
    }

    // TODO - TERMINAR ISSO USANDO O "DB" TEMPORÁRIO PARA TESTAR E PENSAR EM QUAL DB USAR

    // TODO - ESTÁ DANDO ERRO QUE NÃO PODE LER O ARQUIVO
    files = fs.readFileSync("../TOKEN_DB_STORAGE_TEMP/tokens.json");
    console.log(files)

    res.send(token);
  } catch (error) {
    res.send(`Error generating the token, ${error}`);
  }
};

const genPaidToken = async (req, res) => {
  //TODO SALVA EM OUTRO DB OU COM OUTRA CARACTERISTICA, CHAVE-VALOR, SEI LÁ
  return;
};

module.exports = genToken;
