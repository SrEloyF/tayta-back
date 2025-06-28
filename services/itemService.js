const BaseService = require('./BaseService');
const { Item } = require('../models');

class ItemService extends BaseService {
  constructor() {
    super(Item);
  }
}

module.exports = new ItemService();
