const generateCrudRoutes = require('./genericRoutes');
const productoController = require('../controllers/productoController');
const express = require('express');
const router = express.Router();

router.post('/restar-stock/:id_producto', productoController.restar_stock);

const crudRoutes = generateCrudRoutes(productoController);
router.use('/', crudRoutes);

module.exports = router;
