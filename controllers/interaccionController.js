const BaseController = require('./BaseController');
const interaccionService = require('../services/interaccionService');

class InteraccionController extends BaseController {
  constructor() {
    super(interaccionService);
  }
}

module.exports = new InteraccionController();
