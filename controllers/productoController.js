const BaseController = require('./BaseController');
const productoService = require('../services/productoService');

class ProductoController extends BaseController {
  constructor() {
    super(productoService);
  }

  restar_stock = async (req, res) => {
    try {
      const { id_producto } = req.params;
      const { cantidad } = req.body;

      if (!id_producto || !cantidad) {
        return res.status(400).json({ error: 'Id del producto y cantidad son requeridos.' });
      }

      await this.service.restarStock(id_producto, cantidad);
      return res.status(200).json({ message: 'Stock actualizado correctamente.' });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProductoController();
