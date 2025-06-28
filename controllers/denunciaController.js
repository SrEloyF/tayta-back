const BaseController = require('./BaseController');
const denunciaService = require('../services/denunciaService');

class DenunciaController extends BaseController {
  constructor() {
    super(denunciaService);
  }
}

module.exports = new DenunciaController();
