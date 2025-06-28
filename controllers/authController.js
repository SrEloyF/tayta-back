const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const refrescarToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token requerido' });
  }

  try {
    const payload = jwt.verify(refreshToken, refreshSecret);
    const newAccessToken = jwt.sign({ id: payload.id, email: payload.email }, secret, { expiresIn: '10m' });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: 'Refresh token inválido o expirado' });
  }
};

module.exports = { refrescarToken };
