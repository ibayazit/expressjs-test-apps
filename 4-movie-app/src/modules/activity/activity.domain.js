const model = require("./activity.model");
const QueryBuilder = require("../../helper/mongo-query-builder.helper");

const activity = new QueryBuilder(model);

module.exports = { activity };
