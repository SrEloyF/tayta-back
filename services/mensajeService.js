const BaseMongoService = require('./BaseMongoService');
const Mensaje = require('../models/mongoModels/mensaje');

class MensajeService extends BaseMongoService {
  constructor() {
    super(Mensaje);
  }
}

module.exports = new MensajeService();
