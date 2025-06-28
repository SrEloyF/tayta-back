const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ChatSchema = new Schema({
  idParticipantes: [
    {
      type: Number,
      required: true
    }
  ]
});

module.exports = model('Chat', ChatSchema);
