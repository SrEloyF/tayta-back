const express = require('express');

function generateCrudRoutes(controller) {
  const router = express.Router();

  router.get('/', controller.findAll);
  router.post('/', controller.create);
  router.get('/:id', controller.findById);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);
  router.patch('/:id', controller.updateField);
  router.post('/buscar', controller.findByField);
  router.patch('/:id/fields', controller.updateFields);

  return router;
}

module.exports = generateCrudRoutes;
