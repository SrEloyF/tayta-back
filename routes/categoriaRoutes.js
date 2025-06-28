const generateCrudRoutes = require('./genericRoutes');
const categoriaController = require('../controllers/categoriaController');

module.exports = generateCrudRoutes(categoriaController);