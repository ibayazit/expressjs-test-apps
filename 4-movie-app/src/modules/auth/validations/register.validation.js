const { validate, Joi } = require("express-validation");

const validationRules = {
  body: Joi.object({
    name: Joi.string().min(2).max(60).required(),
    surname: Joi.string().min(2).max(60).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(60).required(),
  }),
};

module.exports = validate(validationRules, {}, {});
