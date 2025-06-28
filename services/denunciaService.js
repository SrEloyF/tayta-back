const BaseService = require('./BaseService');
const { Denuncia } = require('../models');

class DenunciaService extends BaseService {
  constructor() {
    super(Denuncia);
  }
}

module.exports = new DenunciaService();
