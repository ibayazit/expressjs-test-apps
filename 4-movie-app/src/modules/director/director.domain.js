const model = require("./director.model");
const QueryBuilder = require("../../helper/mongo-query-builder.helper");

const director = new QueryBuilder(model);

module.exports = { director };
