const generateCrudRoutes = require('./genericRoutes');
const usuarioController = require('../controllers/usuarioController');
const express = require('express');
const router = express.Router();

router.get('/ventas/:id_usuario', usuarioController.ventas);
router.post('/nro_cuenta', usuarioController.actualizarNroCuenta);
router.post('/nro_cuenta/ver', usuarioController.obtenerNroCuenta);

const crudRoutes = generateCrudRoutes(usuarioController);
router.use('/', crudRoutes);

module.exports = router;
