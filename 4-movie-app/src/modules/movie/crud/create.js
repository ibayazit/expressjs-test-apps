const contextValidator = require("../context-validator/crud.validator");
const movieDomain = require("../movie.domain");

module.exports = async (req) => {
  const isCategoryExists = await contextValidator.isCategoryExists(
    req.body.categories
  );
  if (!isCategoryExists) {
    throw new Error("One of your category not found!");
  }

  const createdAtTodayByUserCount =
    await contextValidator.countOfMoviesCreatedTodayByUser(req.user._id);
  if (createdAtTodayByUserCount > 5) {
    throw new Error("You can not create any more for today!");
  }

  const data = {
    addedBy: req.user._id,
    name: req.body.name,
    categories: req.body.categories,
    imdbUrl: req.body.imdbUrl,
    director: req.body.directorId,
    publishAt: req.body.publishAt,
  };

  const movie = await movieDomain.movie.create(data);

  return movie;
};
