const BaseService = require('./BaseService');
const { Interaccion } = require('../models');

class InteraccionService extends BaseService {
  constructor() {
    super(Interaccion);
  }
}

module.exports = new InteraccionService();
