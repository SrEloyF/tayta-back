const generateCrudRoutes = require('./genericRoutes');
const carritoController = require('../controllers/carritoController');

module.exports = generateCrudRoutes(carritoController);
