const BaseController = require('./BaseController');
const carritoService = require('../services/carritoService');

class CarritoController extends BaseController {
  constructor() {
    super(carritoService);
  }
}

module.exports = new CarritoController();
