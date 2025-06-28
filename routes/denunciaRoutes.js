const generateCrudRoutes = require('./genericRoutes');
const denunciaController = require('../controllers/denunciaController');

module.exports = generateCrudRoutes(denunciaController);
