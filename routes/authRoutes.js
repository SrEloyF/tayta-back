const express = require('express');
const router = express.Router();
//se podría cambiar la ubicación de estos archivos
const { login, loginAdmin } = require('../auth/loginController');
const { refrescarToken } = require('../controllers/authController');

router.post('/login', login);
router.post('/refresh', refrescarToken);
router.post('/login/admin', loginAdmin);

module.exports = router;
