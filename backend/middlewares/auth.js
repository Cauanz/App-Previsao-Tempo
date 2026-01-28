const client = require("../providers/cache.provider");

const authToken = async (req, res, next) => {
  const headers = req.headers;
  try {
    const authorization = headers.authorization.split(" ")[0];

    if (authorization !== "Bearer") {
      res.send({
        message: "Unusual token found",
        status: 401,
      });
    }

    const token = headers.authorization.split(" ")[1];

    if (!token) {
      res.send({
        message: "Token missing in request",
        status: 401,
      });
    }

    const cachedToken = await client.get(token);

    if (!cachedToken) {
      res.send({
        message: "Token invalid or expired!",
        status: 401,
      });
      return;
    }

    next();
  } catch (error) {
    res.send({
      message: `Internal error ${error}`,
      status: 500,
    });
  }
};

module.exports = authToken;
