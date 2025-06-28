const BaseService = require('./BaseService');
const { Producto } = require('../models');

class ProductoService extends BaseService {
  constructor() {
    super(Producto);
  }

  async restarStock(idProducto, cantidad) {
    const producto = await Producto.findByPk(idProducto);
    
    if (!producto) {
        throw new Error("Producto no encontrado");
    }

    if (cantidad <= 0) {
        throw new Error("La cantidad a restar debe ser un número positivo");
    }

    if (producto.stock < cantidad) {
        throw new Error("No hay suficiente stock para esta operación");
    }

    producto.stock -= cantidad;

    return await producto.save();
  }

}

module.exports = new ProductoService();
