const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const genToken = async (req, res) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");

    if (!token) {
      res.send({
        message: "An error occurred when trying to create the token",
        status: 400,
      });
    }

    //* ELE FUNCIONA, MAS TANTO O DIRETÓRIO QUANTO O ARQUIVO FICAM NO CONTAINER DO DOCKER, NÃO LOCALMENTE
    const dirPath = path.join(__dirname, "../TOKEN_DB_STORAGE_TEMP");
    const DB_FILE = path.join(__dirname, "../TOKEN_DB_STORAGE_TEMP/tokens.json");

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let files = [];
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf8");
      if (content) files = JSON.parse(content);
    }
    files.push(token);
    fs.writeFileSync(DB_FILE, JSON.stringify(files, null, 2), "utf8");

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
