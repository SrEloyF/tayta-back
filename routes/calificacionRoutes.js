const generateCrudRoutes = require('./genericRoutes');
const calificacionController = require('../controllers/calificacionController');

module.exports = generateCrudRoutes(calificacionController);
