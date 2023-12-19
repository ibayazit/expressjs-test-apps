const { validate, Joi } = require("express-validation");

const validationRules = {
  body: Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().required(),
  }),
};

module.exports = validate(validationRules, {}, {});
