const jwt = require("jsonwebtoken");

const tokenGen = (payload = {}, accessTime = "1d", refreshTime = "15d") => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: accessTime,
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: refreshTime,
  });

  return { accessToken, refreshToken };
};

module.exports = tokenGen;
