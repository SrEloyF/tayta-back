const BaseMongoController = require('./BaseMongoController');
const chatService = require('../services/chatService');

class ChatController extends BaseMongoController {
  constructor() {
    super(chatService);
  }
}

module.exports = new ChatController();
