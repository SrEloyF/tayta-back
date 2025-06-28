class BaseController {
    constructor(service) {
      this.service = service;
    }

    validarCampos = (body) => {
      const atributos = this.service.model.rawAttributes;
      const errores = [];
  
      for (const key in atributos) {
        const atributo = atributos[key];
  
        if (atributo.autoIncrement || atributo.defaultValue !== undefined) continue;
  
        const requerido = atributo.allowNull === false;
        const valor = body[key];
  
        if (requerido && (valor === undefined || valor === null || valor === '')) {
          errores.push(`El campo '${key}' es obligatorio.`);
        }
      }
  
      if (errores.length > 0) {
        throw new Error(errores.join(' '));
      }
    };
  
    create = async (req, res) => {
      try {
        this.validarCampos(req.body);
        const result = await this.service.create(req.body);
        res.status(201).json(result);
      } catch (err) {
        console.log(err);
        res.status(400).json({
          error: err.message,
          msg: err.name || undefined,
          original: err.original?.sqlMessage || undefined
        });
        
      }
    };
  
    findAll = async (req, res) => {
      try {
        const isPaginated = req.query.page !== undefined || req.query.limit !== undefined;
        
        if (isPaginated) {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const offset = (page - 1) * limit;
      
          const result = await this.service.findAll(limit, offset);
          const total = await this.service.countAll();
          const totalPages = Math.ceil(total / limit);
    
          return res.json({
            data: result,
            pagination: {
              page: page,
              limit: limit,
              total: total,
              totalPages: totalPages,
            },
          });
        } else {
          const result = await this.service.findAllWithoutPagination();
          return res.json(result);
        }
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

    findById = async (req, res) => {
      try {
        const result = await this.service.findById(req.params.id);
        if (!result) return res.status(404).json({ error: 'No encontrado' });
        res.json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
  
    update = async (req, res) => {
      try {
        this.validarCampos(req.body);
        const result = await this.service.update(req.params.id, req.body);
        if (!result) return res.status(404).json({ error: 'No encontrado' });
        res.json(result);
      } catch (err) {
        res.status(400).json({ 
          error: err.message,
          msg: err.name || undefined,
          original: err.original?.sqlMessage || undefined
         });
      }
    };
  
    delete = async (req, res) => {
      try {
        const success = await this.service.delete(req.params.id);
        if (!success) return res.status(404).json({ error: 'No encontrado' });
        res.status(204).send();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

    updateField = async (req, res) => {
      const { campo, valor } = req.body;
    
      if (!campo || valor === undefined) {
        return res.status(400).json({ error: "Se requiere 'campo' y 'valor'" });
      }
    
      try {
        const result = await this.service.updateField(req.params.id, campo, valor);
        if (!result) return res.status(404).json({ error: 'No encontrado' });
        res.json(result);
      } catch (err) {
        res.status(400).json({ 
          error: err.message,
          msg: err.name || undefined,
          original: err.original?.sqlMessage || undefined
         });
      }
    };

    findByField = async (req, res) => {
      const { campo, valor } = req.body;
    
      if (!campo || valor === undefined) {
        return res.status(400).json({ error: "Se requiere 'campo' y 'valor'" });
      }
    
      try {
        const result = await this.service.findByField(campo, valor);
        res.json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    };
    
  }
  
  module.exports = BaseController;
  