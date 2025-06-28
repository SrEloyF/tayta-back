const BaseMongoController = require('./BaseMongoController');
const mensajeService = require('../services/mensajeService');

class MensajeController extends BaseMongoController {
  constructor() {
    super(mensajeService);
  }
}

module.exports = new MensajeController();
