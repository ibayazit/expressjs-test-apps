const mongoose = require("mongoose");
const responder = require("../../utils/responder.util");
const activityDomain = require("./activity.domain");
const paginator = require("../../utils/database-pagination.util");

const getActivities = responder(async (req, res) => {
  const filterStages = [
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id),
      },
    },
  ];

  if (req.query.search) {
    filterStages.push({
      $match: {
        activity: new RegExp(req.query.search, "i"),
      },
    });
  }

  const activities = await paginator(
    activityDomain.activity,
    filterStages,
    req
  );

  return {
    data: activities,
  };
});

const createActivity = responder(async (req, res) => {
  const data = {
    activity: req.body.activity,
    movie: req.body.movieId,
    user: req.user._id,
  };

  const activity = await activityDomain.activity.create(data);

  return {
    data: activity,
    status: 201,
  };
});

const deleteActivity = responder(async (req, res) => {
  const activity = await activityDomain.activity.deleteById(req.params.id);

  return {
    data: activity,
    status: activity ? 200 : 404,
  };
});

module.exports = {
  getActivities,
  createActivity,
  deleteActivity,
};
