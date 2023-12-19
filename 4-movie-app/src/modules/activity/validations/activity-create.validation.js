const { validate, Joi } = require("express-validation");
const { activityTypes } = require("../enums");

const validationRules = {
  body: Joi.object({
    activity: Joi.string()
      .valid(...Object.values(activityTypes))
      .required(),
    movieId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = validate(validationRules, {}, {});
