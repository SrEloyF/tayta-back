const generateCrudRoutes = require('./genericRoutes');
const itemController = require('../controllers/itemController');

module.exports = generateCrudRoutes(itemController);
