const jwt = require("jsonwebtoken");

const tokenGen = (payload = Object, accessTime = "1d", refreshTime = "15d") => {
  const accessToken = jwt.sign(payload, process.env.accessSecret, {
    expiresIn: accessTime,
  });

  const refreshToken = jwt.sign(payload, process.env.refreshSecret, {
    expiresIn: refreshTime,
  });

  return { accessToken, refreshToken };
};

module.exports = tokenGen;
