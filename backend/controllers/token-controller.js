const crypto = require("crypto");
const client = require("../providers/cache.provider");

const genToken = async (req, res) => {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    const UID = crypto.randomUUID();

    if (!token) {
      res.send({
        message: "An error occurred when trying to create the token",
        status: 400,
      });
    }

    const cachedToken = await client.get(token);
    if (cachedToken) {
      res.send({
        message: "Token already generated [this message is for the developer]",
        status: 500,
      });
    }
    await client.set(token, UID, { EX: 60 });

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
