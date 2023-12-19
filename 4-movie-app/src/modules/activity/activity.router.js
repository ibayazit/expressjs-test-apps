const express = require("express");
const router = express.Router();
const {
  getActivities,
  createActivity,
  deleteActivity,
} = require("./activity.controller");

const getValidation = require("./validations/activity-get.validation");
const createValidation = require("./validations/activity-create.validation");
const deleteValidation = require("./validations/activity-delete.validation");

router
  .route("/")
  .get(getValidation, getActivities)
  .post(createValidation, createActivity);

router.route("/:id").delete(deleteValidation, deleteActivity);

module.exports = router;
