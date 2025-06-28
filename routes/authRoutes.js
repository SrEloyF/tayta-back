const express = require('express');
const router = express.Router();
//se podría cambiar la ubicación de estos archivos
const { login } = require('../auth/loginController');
const { refrescarToken } = require('../controllers/authController');

router.post('/login', login);
router.post('/refresh', refrescarToken);

module.exports = router;
