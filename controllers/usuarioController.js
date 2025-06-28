const BaseController = require('./BaseController');
const usuarioService = require('../services/usuarioService');

class UsuarioController extends BaseController {
  constructor() {
    super(usuarioService);
  }

  ventas = async (req, res) => {
    try {
      const id_usuario = req.params.id_usuario;
      const ventas = await this.service.getVentas(id_usuario);
      res.json(ventas);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  actualizarNroCuenta = async (req, res) => {
    try {
      const { nro_cuenta, id_usuario } = req.body;

      if (!nro_cuenta || nro_cuenta.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'El número de cuenta es obligatorio.',
        });
      }

      if (!/^\d+$/.test(nro_cuenta)) {
        return res.status(400).json({
          success: false,
          message: 'El número de cuenta debe ser un valor numérico.',
        });
      }

      if (!id_usuario || isNaN(id_usuario)) {
        return res.status(400).json({
          success: false,
          message: 'ID de usuario inválido.',
        });
      }

      const usuarioActualizado = await this.service.setNroCuenta(nro_cuenta, id_usuario);

      res.status(200).json({
        success: true,
        message: 'Nro de cuenta asignado correctamente',
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  obtenerNroCuenta = async (req, res) => {
    try {
      const { id_usuario } = req.body;

      if (!id_usuario || isNaN(id_usuario)) {
        return res.status(400).json({
          success: false,
          message: 'ID de usuario inválido.',
        });
      }

      const nroCuentaDesencriptado = await this.service.getNroCuenta(id_usuario);
      res.status(200).json({
        success: true,
        nro_cuenta: nroCuentaDesencriptado,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

}

module.exports = new UsuarioController();
