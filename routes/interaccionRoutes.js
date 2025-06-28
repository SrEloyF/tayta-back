const generateCrudRoutes = require('./genericRoutes');
const interaccionController = require('../controllers/interaccionController');

module.exports = generateCrudRoutes(interaccionController);
