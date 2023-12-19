const express = require("express");
const router = express.Router();
const {
  getDirectors,
  getDirector,
  createDirector,
  updateDirector,
  deleteDirector,
} = require("./director.controller");

const getValidation = require("./validations/director-get.validation");
const createValidation = require("./validations/director-create.validation");
const updateValidation = require("./validations/director-create.validation");
const deleteValidation = require("./validations/director-delete.validation");

router
  .route("/")
  .get(getValidation, getDirectors)
  .post(createValidation, createDirector);

router
  .route("/:id")
  .get(getDirector)
  .patch(updateValidation, updateDirector)
  .delete(deleteValidation, deleteDirector);

module.exports = router;
