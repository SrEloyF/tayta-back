const BaseController = require('./BaseController');
const categoriaService = require('../services/categoriaService');

class CategoriaController extends BaseController {
  constructor() {
    super(categoriaService);
  }

}

module.exports = new CategoriaController();
