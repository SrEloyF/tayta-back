const BaseService = require('./BaseService');
const { CarritoProducto } = require('../models');

class CarritoProductoService extends BaseService {
  constructor() {
    super(CarritoProducto);
  }
}

module.exports = new CarritoProductoService();
