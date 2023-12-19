const model = require("./user.model");
const QueryBuilder = require("../../helper/mongo-query-builder.helper");

const user = new QueryBuilder(model);

module.exports = { user };
