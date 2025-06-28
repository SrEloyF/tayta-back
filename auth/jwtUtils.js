const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const generarToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

const generarRefreshToken = (payload) => {
  return jwt.sign(payload, refreshSecret, { expiresIn: '7d' });
};

const verificarToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { generarToken, verificarToken, generarRefreshToken };
