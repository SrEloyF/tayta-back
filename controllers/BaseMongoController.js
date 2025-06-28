class BaseMongoController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res) => {
    try {
      const result = await this.service.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  findAll = async (req, res) => {
    try {
      const result = await this.service.findAll();
      res.json(result);
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
      const result = await this.service.update(req.params.id, req.body);
      if (!result) return res.status(404).json({ error: 'No encontrado' });
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
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
}

module.exports = BaseMongoController;