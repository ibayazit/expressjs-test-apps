const { validate, Joi } = require("express-validation");

const validationRules = {
  body: Joi.object({
    title: Joi.string().max(80).required(),
  }),
};

module.exports = validate(validationRules, {}, {});
