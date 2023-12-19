const express = require("express");
const router = express.Router();
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("./movie.controller");

const getValidation = require("./validations/movie-get.validation");
const createValidation = require("./validations/movie-create.validation");
const updateValidation = require("./validations/movie-create.validation");
const deleteValidation = require("./validations/movie-delete.validation");

router
  .route("/")
  .get(getValidation, getMovies)
  .post(createValidation, createMovie);

router
  .route("/:id")
  .get(getMovie)
  .patch(updateValidation, updateMovie)
  .delete(deleteValidation, deleteMovie);

module.exports = router;
