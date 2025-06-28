const BaseController = require('./BaseController');
const itemService = require('../services/itemService');

class ItemController extends BaseController {
  constructor() {
    super(itemService);
  }
}

module.exports = new ItemController();
