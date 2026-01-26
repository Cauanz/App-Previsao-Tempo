const fs = require("fs");
const path = require("path");

// TODO - FUNCIONANDO, MAS REVISAR, ACHO QUE TEM COISAS SOBRE SEGURANÇA DE TOKEN ETC... FALTANDO. E CÓDIGOS DE ERRO HTTP DEVEM ESTAR TODOS ERRADOS
const authToken = async (req, res, next) => {
  const headers = req.headers;
  try {
    const authorization = headers.authorization.split(" ")[0];

    if (authorization !== "Bearer") {
      res.send({
        message: "Bearer token missing in request",
        status: 500,
      });
    }

    const token = headers.authorization.split(" ")[1];

    if (!token) {
      res.send({
        message: "Token missing in request",
        status: 500,
      });
    }

    // TODO - E OBVIAMENTE IMPLEMENTAR UM DB REAL
    const DB_FILE = path.join(
      __dirname,
      "../TOKEN_DB_STORAGE_TEMP/tokens.json",
    );

    let files = [];
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf8");
      if (content) files = JSON.parse(content);
    }

    if (!files.includes(token)) {
      res.send("Token invalid!");
    }

    next();
  } catch (error) {
    res.send({
      message: error,
      status: 500,
    });
  }
};

module.exports = authToken;
