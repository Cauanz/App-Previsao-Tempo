const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getToken = async (req, res) => {
  const user = req.params.user;
  const password = req.params.password;

  if (!user || !password) {
    res.send({
      message: "Username or password missing or invalid",
      status: 500,
    });
  }

  try {
    const salt = bcrypt.genSalt(10);

    const data = user + password;
    const hashedData = bcrypt.hash(data, salt);

    const token = jwt.sign(hashedData, process.env.SECRET);

    if (!token) {
      res.send({
        message: "An error occurred when trying to create the token",
        status: 400,
      });

      res.send(token);
    }
  } catch (error) {
    res.send(`Error generating the token, ${error}`);
  }
};

module.exports = getToken;