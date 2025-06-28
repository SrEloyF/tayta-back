const generateCrudRoutes = require('./genericRoutes');
const motivoDenunciaController = require('../controllers/motivoDenunciaController');

module.exports = generateCrudRoutes(motivoDenunciaController);
