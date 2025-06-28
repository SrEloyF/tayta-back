const bcrypt = require('bcryptjs');
const BaseService = require('./BaseService');
const { Usuario } = require('../models');
const { sequelize } = require('../models');
const crypto = require('crypto');

class UsuarioService extends BaseService {
  constructor() {
    super(Usuario);
  }

  async create(data) {
    if (!data.contrasena) {
      throw new Error("La contraseña es requerida");
    }

    const salt = await bcrypt.genSalt(10);
    data.contrasena = await bcrypt.hash(data.contrasena, salt);

    return await super.create(data);
  }

  async validatePassword(email, plainPassword) {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return null;

    const match = await bcrypt.compare(plainPassword, usuario.contrasena);
    if (!match) return null;

    return usuario;
  }

  async getVentas(id_vendedor) {
    const { CarritoProducto, Carrito, Item, Usuario } = sequelize.models;

    const ventas = await CarritoProducto.findAll({
      include: [
        {
          model: Item,
          where: { id_vendedor },
          attributes: ['id_item', 'nombre', 'precio']
        },
        {
          model: Carrito,
          where: { estado: 'V' },
          attributes: ['id_carrito'],
          include: [
            {
              model: Usuario,
              attributes: ['nombres', 'apellidos']
            }
          ]
        }
      ],
      attributes: ['cantidad'],
      order: [
        [sequelize.models.Carrito, 'id_carrito', 'DESC'],
        [Item, 'id_item', 'ASC']
      ]
    });

    return ventas.map(venta => {
      return {
        id_producto: venta.Item.id_item,
        nombre_producto: venta.Item.nombre,
        cantidad: venta.cantidad,
        comprador: `${venta.Carrito.Usuario.nombres} ${venta.Carrito.Usuario.apellidos}`,
        nro_venta: venta.Carrito.id_carrito,
        total_pagado: venta.Item.precio * venta.cantidad
      };
    });
  }

  encryptAccountNumber(accountNumber) {
    const algorithm = 'aes-256-cbc';
    const ivLength = 16;
    const iv = crypto.randomBytes(ivLength);
    const key = Buffer.from(process.env.SECRET_KEY.padEnd(32, '0').slice(0, 32), 'utf-8');

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(accountNumber, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return { encryptedData: encrypted, iv: iv.toString('hex') };
  }

  decryptAccountNumber(encryptedData, iv) {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(process.env.SECRET_KEY.padEnd(32, '0').slice(0, 32), 'utf-8');
    const ivBuffer = Buffer.from(iv, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
  }

  async setNroCuenta(nro_cuenta, id_usuario) {
    try {
      const { encryptedData, iv } = this.encryptAccountNumber(nro_cuenta);
      const usuario = await Usuario.findByPk(id_usuario);

      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      usuario.nro_cuenta = encryptedData;
      usuario.iv = iv;
      await usuario.save();

      return usuario;
    } catch (error) {
      throw new Error(`Error al actualizar el número de cuenta: ${error.message}`);
    }
  }

  async getNroCuenta(id_usuario) {
    try {
      const usuario = await Usuario.findByPk(id_usuario);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      if (!usuario.nro_cuenta || !usuario.iv) {
        throw new Error('El usuario consultado no tiene un número de cuenta registrado');
      }

      const decryptedAccountNumber = this.decryptAccountNumber(usuario.nro_cuenta, usuario.iv);

      return decryptedAccountNumber;
    } catch (error) {
      throw new Error(`Error al obtener el número de cuenta: ${error.message}`);
    }
  }


}

module.exports = new UsuarioService();
