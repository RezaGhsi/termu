const jwt = require("jsonwebtoken");

const tokenGen = (payload = {}, accessTime = "1d", refreshTime = "15d") => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTime,
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTime,
  });

  return { accessToken, refreshToken };
};

module.exports = tokenGen;
