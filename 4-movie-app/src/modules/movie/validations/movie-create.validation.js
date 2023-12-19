const { validate, Joi } = require("express-validation");

const validationRules = {
  body: Joi.object({
    name: Joi.string().min(3).required(),
    categories: Joi.array().items(Joi.string().hex().length(24).required()),
    imdbUrl: Joi.string().required(),
    directorId: Joi.string().hex().length(24).required(),
    publishAt: Joi.date().required(),
  }),
};

module.exports = validate(validationRules, {}, {});
