const contextValidator = require("../context-validator/crud.validator");
const movieDomain = require("../movie.domain");

module.exports = async (req) => {
  const isCategoryExists = await contextValidator.isCategoryExists(
    req.body.categories
  );
  if (!isCategoryExists) {
    throw new Error("One of your category not found!");
  }

  const data = {
    name: req.body.name,
    categories: req.body.categories,
    imdbUrl: req.body.imdbUrl,
    director: req.body.directorId,
    publishAt: req.body.publishAt,
  };

  const movie = await movieDomain.movie.updateById(req.params.id, data);

  return movie;
};
