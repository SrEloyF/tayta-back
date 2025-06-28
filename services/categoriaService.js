const BaseService = require('./BaseService');
const { Categoria } = require('../models');

class CategoriaService extends BaseService {
  constructor() {
    super(Categoria);
  }

}

module.exports = new CategoriaService();
