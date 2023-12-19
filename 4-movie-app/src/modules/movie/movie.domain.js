const model = require("./movie.model");
const QueryBuilder = require("../../helper/mongo-query-builder.helper");

const movie = new QueryBuilder(model);

module.exports = { movie };
