const BaseService = require('./BaseService');
const { MotivoDenuncia } = require('../models');

class MotivoDenunciaService extends BaseService {
  constructor() {
    super(MotivoDenuncia);
  }
}

module.exports = new MotivoDenunciaService();
