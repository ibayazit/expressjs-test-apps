const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./user.controller");

const getValidation = require("./validations/user-get.validation");
const createValidation = require("./validations/user-create.validation");
const updateValidation = require("./validations/user-create.validation");
const deleteValidation = require("./validations/user-delete.validation");

router
  .route("/")
  .get(getValidation, getUsers)
  .post(createValidation, createUser);

router
  .route("/:id")
  .get(getUser)
  .patch(updateValidation, updateUser)
  .delete(deleteValidation, deleteUser);

module.exports = router;
