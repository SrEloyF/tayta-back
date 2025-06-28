const generateCrudRoutes = require('./genericRoutes');
const carritoProductoController = require('../controllers/carritoProductoController');

module.exports = generateCrudRoutes(carritoProductoController);
