const BaseController = require('./BaseController');
const motivoDenunciaService = require('../services/motivoDenunciaService');

class MotivoDenunciaController extends BaseController {
  constructor() {
    super(motivoDenunciaService);
  }
}

module.exports = new MotivoDenunciaController();
