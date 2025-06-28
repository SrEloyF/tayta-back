class BaseService {
    constructor(model) {
      this.model = model;
    }
  
    async create(data) {
      return await this.model.create(data);
    }
  
    async findAll(limit, offset) {
      return await this.model.findAll({
        limit: limit,
        offset: offset,
      });
    }
    
    async findAllWithoutPagination() {
      return await this.model.findAll();
    }
    
    async countAll() {
      return await this.model.count();
    }
  
    async findById(id) {
      return await this.model.findByPk(id);
    }
  
    async update(id, data) {
      const instance = await this.findById(id);
      if (!instance) return null;
      return await instance.update(data);
    }
  
    async delete(id) {
      const instance = await this.findById(id);
      if (!instance) return null;
      await instance.destroy();
      return true;
    }

    async updateField(id, campo, valor) {
      const instancia = await this.findById(id);
      if (!instancia) return null;
    
      if (!(campo in this.model.rawAttributes)) {
        throw new Error(`El campo '${campo}' no es válido.`);
      }
    
      instancia[campo] = valor;
      return await instancia.save();
    }

    async findByField(campo, valor) {
      if (!(campo in this.model.rawAttributes)) {
        throw new Error(`El campo '${campo}' no es válido.`);
      }
    
      return await this.model.findAll({
        where: {
          [campo]: valor,
        },
      });
    }
    
  }
  
  module.exports = BaseService;
  