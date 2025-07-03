const usuarioService = require('../services/usuarioService');
const { generarToken, generarRefreshToken } = require('./jwtUtils');

const login = async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  const usuario = await usuarioService.validatePassword(email, contrasena);

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const accessToken = generarToken({ id: usuario.id_usuario, email: usuario.email });
  const refreshToken = generarRefreshToken({ id: usuario.id_usuario, email: usuario.email });

  res.json({ accessToken, refreshToken });
};

const loginAdmin = async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  const usuario = await usuarioService.validatePassword(email, contrasena);

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  if (usuario.id_usuario !== 2) {
    return res.status(403).json({ error: 'Usuario no autorizado' });
  }

  const accessToken = generarToken({ id: usuario.id_usuario, email: usuario.email });
  const refreshToken = generarRefreshToken({ id: usuario.id_usuario, email: usuario.email });
  
  res.json({ accessToken, refreshToken });
}

module.exports = { login, loginAdmin };