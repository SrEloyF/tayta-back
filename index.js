// backend/index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const fs = require('fs');

const Chat = require('./models/mongoModels/chat');
const Mensaje = require('./models/mongoModels/mensaje');

// Conexiones a bases
mongoose.connect(process.env.URI)
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch(err => console.error('🔴 Error al conectar a MongoDB', err));

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ['http://localhost:3000', 'https://taytaservice-2.onrender.com', 'https://tayta-front.onrender.com'], methods: ['GET','POST', 'PATCH', 'DELETE'], allowedHeaders: ['Content-Type','Authorization'] }
});

// Middlewares
app.use(express.json());

// Configuración de CORS
app.use((req, res, next) => {
  // Permitir solicitudes desde el origen del frontend
  const allowedOrigins = ['http://localhost:3000', 'https://taytaservice-2.onrender.com', 'https://tayta-front.onrender.com'];
  res.header('Access-Control-Allow-Origin', allowedOrigins.includes(req.headers.origin) ? req.headers.origin : '');

  // Permitir credenciales (cookies, encabezados de autenticación)
  res.header('Access-Control-Allow-Credentials', 'true');
  // Métodos HTTP permitidos
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  // Encabezados permitidos
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Manejar solicitudes de preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Middleware para servir archivos estáticos con autenticación
const serveStaticWithAuth = (req, res, next) => {
  // Si es una solicitud de imagen, verificar autenticación
  if (req.path.match(/\.(jpg|jpeg|png|gif)$/i)) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    // Si pasa la autenticación, servir el archivo
    return express.static(path.join(__dirname, 'uploads', 'item_imgs'))(req, res, next);
  }
  next();
};

app.get('/api/uploads/list/:folder', require('./auth/authMiddleware'), (req, res) => {
  const { folder } = req.params;
  if (!['user_imgs', 'item_imgs'].includes(folder)) {
    return res.status(400).json({ error: 'Carpeta no permitida' });
  }
  const dirPath = path.join(__dirname, 'uploads', folder);
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'No se pudo leer la carpeta' });
    }
    res.json(files);
  });
});

// Rutas para servir archivos estáticos con autenticación
app.use('/api/uploads/user_imgs', require('./auth/authMiddleware'), express.static(path.join(__dirname, 'uploads','user_imgs')));
app.use('/api/uploads/item_imgs', serveStaticWithAuth);
app.use('/api/uploads/:folder/:img', (req, res, next) => {
  if (!res.headersSent) {
    return res.status(404).json({ error: 'el archivo no existe en el servidor' });
  }
  next();
});

// Rutas REST
app.use('/api/auth', require('./routes/authRoutes'));
//app.use('/api/usuarios', require('./auth/authMiddleware'), require('./routes/usuarioRoutes'));
const authMiddleware = require('./auth/authMiddleware');
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', (req, res, next) => {
  if (req.method === 'POST' && req.path === '/') {
    return next();
  }
  authMiddleware(req, res, next);
}, usuarioRoutes);

app.use('/api/categorias', require('./auth/authMiddleware'), require('./routes/categoriaRoutes'));
app.use('/api/motivos-denuncia', require('./auth/authMiddleware'), require('./routes/motivoDenunciaRoutes'));
app.use('/api/items', require('./auth/authMiddleware'), require('./routes/itemRoutes'));
app.use('/api/productos', require('./auth/authMiddleware'), require('./routes/productoRoutes'));
app.use('/api/interacciones', require('./auth/authMiddleware'), require('./routes/interaccionRoutes'));
app.use('/api/calificaciones', require('./auth/authMiddleware'), require('./routes/calificacionRoutes'));
//app.use('/api/compras', require('./auth/authMiddleware'), require('./routes/compraRoutes'));
app.use('/api/denuncias', require('./auth/authMiddleware'), require('./routes/denunciaRoutes'));
app.use('/api/upload-img', require('./routes/uploadRoutes')); // uploadRoutes incluye su propio middleware
app.use('/api/chats', require('./auth/authMiddleware'), require('./routes/chatRoutes'));
app.use('/api/mensajes', require('./auth/authMiddleware'), require('./routes/mensajeRoutes'));

app.use('/api/carritos', require('./auth/authMiddleware'), require('./routes/carritoRoutes'));
app.use('/api/carritos-productos', require('./auth/authMiddleware'), require('./routes/carritoProductoRoutes'));

// Socket.IO
const usuariosConectados = {}; // map userId -> socketId

io.on('connection', socket => {
  console.log('🔌 Cliente conectado', socket.id);

  socket.on('registrarUsuario', userId => {
    usuariosConectados[userId] = socket.id;
  });

  socket.on('mensaje', async data => {
    console.log('📨 Evento mensaje recibido:', data);
    const { idChat, emisor, contenido, _idTemp } = data;
    try {
      // Buscamos chat por su _id
      const chat = await Chat.findById(idChat);
      if (!chat) {
        console.error('Chat no encontrado para idChat:', idChat);
        return;
      }

      // Almacenamos el mensaje
      const mensaje = await Mensaje.create({
        idChat: chat._id,
        idEmisor: emisor,
        contenido,
        timestamp: new Date(),
      });

      // Preparamos el payload a enviar
      const mensajeFrontend = {
        _id: mensaje._id,
        _idTemp,
        idChat: mensaje.idChat,
        idEmisor: mensaje.idEmisor,
        contenido: mensaje.contenido,
        timestamp: mensaje.timestamp,
      };

      // Emitimos a todos los participantes del chat
      chat.idParticipantes.forEach(userId => {
        const sockId = usuariosConectados[userId];
        if (sockId) io.to(sockId).emit('mensaje', mensajeFrontend);
      });
    } catch (err) {
      console.error('Error manejando mensaje por socket:', err);
    }
  });
});

// Arrancar servidor HTTP con Socket.IO
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Servidor escuchando en puerto ${PORT}`));
