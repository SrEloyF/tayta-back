const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const MensajeSchema = new Schema({
  idChat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  idEmisor: {
    type: Number,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  estado: { 
    type: String, 
    required: true, 
    enum: ['E', 'R', 'L'], //Enviado, Recibido, Leído
    default: 'E'
  }
});

module.exports = model('Mensaje', MensajeSchema);
