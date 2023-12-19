const model = require("./category.model");
const QueryBuilder = require("../../helper/mongo-query-builder.helper");

const category = new QueryBuilder(model);

module.exports = { category };
