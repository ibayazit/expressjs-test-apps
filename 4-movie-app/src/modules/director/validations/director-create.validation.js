const { validate, Joi } = require("express-validation");

const validationRules = {
  body: Joi.object({
    name: Joi.string().min(3).required(),
    surname: Joi.string().min(2).required(),
    imdbUrl: Joi.string().required(),
  }),
};

module.exports = validate(validationRules, {}, {});
