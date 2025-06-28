const BaseController = require('./BaseController');
const calificacionService = require('../services/calificacionService');

class CalificacionController extends BaseController {
  constructor() {
    super(calificacionService);
  }
}

module.exports = new CalificacionController();
