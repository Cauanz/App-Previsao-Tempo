const fs = require("fs");
const path = require("path");
const client = require("../providers/cache.provider");

// TODO - FUNCIONANDO, MAS REVISAR, ACHO QUE TEM COISAS SOBRE SEGURANÇA DE TOKEN ETC... FALTANDO. E CÓDIGOS DE ERRO HTTP DEVEM ESTAR TODOS ERRADOS
const authToken = async (req, res, next) => {
  const headers = req.headers;
  try {
    const authorization = headers.authorization.split(" ")[0];

    if (authorization !== "Bearer") {
      res.send({
        message: "Unusual token found",
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

    const cachedToken = await client.get(token);

    if (!cachedToken) {
      res.send("Token invalid or expired!");
      return;
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
