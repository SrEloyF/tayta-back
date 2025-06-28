const BaseController = require('./BaseController');
const carritoProductoService = require('../services/carritoProductoService');

class CarritoProductoController extends BaseController {
  constructor() {
    super(carritoProductoService);
  }
}

module.exports = new CarritoProductoController();
