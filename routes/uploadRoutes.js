const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

// Carpetas permitidas para subir archivos
const allowedFolders = ['user_imgs', 'item_imgs'];

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Usar carpeta desde req.body (no req.query)
    let carpeta = 'item_imgs';
    if (req.body.carpeta && allowedFolders.includes(req.body.carpeta)) {
      carpeta = req.body.carpeta;
    }

    const dir = path.join(__dirname, '..', 'uploads', carpeta);
    try {
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    } catch (err) {
      cb(err);
    }
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${timestamp}${ext}`);
  }
});

// Configurar multer con límites de archivo
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  },
  fileFilter: (req, file, cb) => {
    // Validar tipos de archivo
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes JPG y PNG.'));
    }
  }
});

const exemptUrls = [
  'http://localhost:3000/auth/register',
  'https://midominio.com/auth/register'
];

const conditionalAuth = (req, res, next) => {
  const referer = req.get('Referer') || req.get('Origin');
  if (referer && exemptUrls.some(url => referer.startsWith(url))) {
    return next();
  }
  return authMiddleware(req, res, next);
};

router.post('/',
  conditionalAuth,
  upload.single('imagen'), // ¡Esto ahora procesa los campos del form!
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No se recibió ningún archivo o el archivo es inválido.'
        });
      }

      // Obtener carpeta de req.body (no req.query)
      const carpeta = (req.body.carpeta && allowedFolders.includes(req.body.carpeta))
        ? req.body.carpeta
        : 'item_imgs';

      const imageUrl = `/api/uploads/${carpeta}/${req.file.filename}`;

      res.json({
        success: true,
        nombreArchivo: req.file.filename,
        url: imageUrl,
        mensaje: 'Imagen subida correctamente',
        carpeta: carpeta // Ahora coincidirá con lo enviado
      });

    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      res.status(500).json({
        success: false,
        error: 'Error al procesar la imagen',
        detalle: error.message
      });
    }
  }
);

// Manejador de errores global
router.use((err, req, res, next) => {
  console.error('Error en uploadRoutes:', err);
  res.status(500).json({
    success: false,
    error: 'Error al procesar la solicitud',
    detalle: err.message
  });
});

module.exports = router;
