const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

const allowedFolders = ['user_imgs', 'item_imgs'];

// Cambia a memoryStorage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 5MB
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes JPG y PNG.'));
    }
  }
});

router.post(
  '/',
  upload.single('imagen'),
  async (req, res) => {
    try {
      const carpeta = req.body.carpeta;
      if (!carpeta || !allowedFolders.includes(carpeta)) {
        return res.status(400).json({ success: false, error: 'Carpeta no permitida' });
      }
      if (!req.file) {
        return res.status(400).json({ success: false, error: 'No se recibió ningún archivo o el archivo es inválido.' });
      }

      const timestamp = Date.now();
      const fileExtension = req.file.originalname.split('.').pop();
      const uniqueFileName = `${timestamp}.${fileExtension}`;
      
      const form = new FormData();
      form.append('file', req.file.buffer, {
        filename: uniqueFileName,
        contentType: req.file.mimetype
      });
      form.append('fileName', uniqueFileName);  // Usa el nombre único aquí
      form.append('folder', carpeta);

      // Autenticación básica para ImageKit
      const imagekitKey = process.env.KEY_IMG;
      const authHeader = 'Basic ' + Buffer.from(imagekitKey + ':').toString('base64');

      // Sube la imagen a ImageKit
      const response = await axios.post(
        'https://api.imagekit.io/v1/files/upload',
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: authHeader
          }
        }
      );

      res.json({
        nombreArchivo: response.data.name
      });

    } catch (error) {
      console.error('Error al subir imagen a ImageKit:', error?.response?.data || error.message);
      res.status(500).json({
        success: false,
        error: 'Error al procesar la imagen',
        detalle: error?.response?.data || error.message
      });
    }
  }
);


module.exports = router;