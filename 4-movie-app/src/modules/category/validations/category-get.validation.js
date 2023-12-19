const { validate, Joi } = require("express-validation");

const validationRules = {
  query: Joi.object({
    page: Joi.number().integer().min(1),
    pageSize: Joi.number().integer().min(1),
    search: Joi.string().min(3),
  }),
};

module.exports = validate(validationRules, {}, {});
