const BaseService = require('./BaseService');
const { Calificacion } = require('../models');

class CalificacionService extends BaseService {
  constructor() {
    super(Calificacion);
  }
}

module.exports = new CalificacionService();
