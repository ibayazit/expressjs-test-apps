const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("./category.controller");

const getValidation = require("./validations/category-get.validation");
const createValidation = require("./validations/category-create.validation");
const updateValidation = require("./validations/category-create.validation");
const deleteValidation = require("./validations/category-delete.validation");

router
  .route("/")
  .get(getValidation, getCategories)
  .post(createValidation, createCategory);

router
  .route("/:id")
  .get(getCategory)
  .patch(updateValidation, updateCategory)
  .delete(deleteValidation, deleteCategory);

module.exports = router;
