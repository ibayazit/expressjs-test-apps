const responder = require("../../utils/responder.util");
const movieDomain = require("./movie.domain");
const paginator = require("../../utils/database-pagination.util");
const contextValidator = require("./context-validator/crud.validator");
const crudCreate = require("./crud/create");
const crudUpdate = require("./crud/update");

const getMovies = responder(async (req) => {
  const search = req.query.search;

  const filterStages = [
    {
      $lookup: {
        from: "categories",
        localField: "categories",
        foreignField: "_id",
        as: "categories",
      },
    },
    {
      $lookup: {
        from: "directors",
        localField: "director",
        foreignField: "_id",
        as: "director",
      },
    },
    {
      $unwind: "$director",
    },
  ];

  if (search) {
    filterStages.push({
      $match: {
        name: new RegExp(search, "i"),
      },
    });
  }

  const movies = await paginator(movieDomain.movie, filterStages, req);

  if (search && movies.data.length) {
    await contextValidator.createSearchActivity(req.user._id, movies);
  }

  return {
    data: movies,
  };
});

const createMovie = responder(async (req) => {
  const movie = await crudCreate(req);

  contextValidator.createSideEffects(req.user, movie);

  return {
    data: movie,
    status: 201,
  };
});

const getMovie = responder(async (req) => {
  const movie = await movieDomain.movie.findById(req.params.id, {
    path: "categories",
  });

  return {
    data: movie,
    status: movie ? 200 : 404,
  };
});

const updateMovie = responder(async (req, res) => {
  const movie = await crudUpdate(req);

  return {
    data: movie,
    status: movie ? 200 : 404,
  };
});

const deleteMovie = responder(async (req, res) => {
  const movie = await movieDomain.movie.deleteById(req.params.id);

  return {
    data: movie,
    status: movie ? 200 : 404,
  };
});

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
