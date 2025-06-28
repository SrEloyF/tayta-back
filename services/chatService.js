const BaseMongoService = require('./BaseMongoService');
const Chat = require('../models/mongoModels/chat');

class ChatService extends BaseMongoService {
  constructor() {
    super(Chat);
  }
}

module.exports = new ChatService();
