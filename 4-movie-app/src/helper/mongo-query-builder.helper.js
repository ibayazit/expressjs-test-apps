module.exports = class MongoQueryBuilder {
  #model = null;

  constructor(model) {
    this.#model = model;
  }

  async countDocuments() {
    return this.#model.countDocuments();
  }

  async aggregate(stages) {
    return this.#model.aggregate(stages);
  }

  async findById(id, populates = null) {
    const response = await this.#model.findById(id).populate(populates);

    return response;
  }

  async findBy(where) {
    const response = await this.#model.findOne({ ...where });

    return response;
  }

  async get(options = {}, populates = null) {
    const responses = await this.#model.find(options).populate(populates);

    return responses;
  }

  async create(data) {
    const response = await this.#model.create(data);

    return response;
  }

  async updateById(id, data) {
    const response = await this.#model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return response;
  }

  async deleteById(id) {
    const response = await this.updateById(id, { deletedAt: new Date() });

    return response;
  }

  async hardDeleteById(id) {
    const response = await this.#model.findByIdAndDelete(id);

    return response;
  }
};
