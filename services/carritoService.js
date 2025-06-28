const BaseService = require('./BaseService');
const { Carrito } = require('../models');

class CarritoService extends BaseService {
  constructor() {
    super(Carrito);
  }
}

module.exports = new CarritoService();
