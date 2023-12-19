const movieDomain = require("../movie.domain");
const userDomain = require("../../user/user.domain");
const { bulkMail } = require("../../../helper/notification.helper");
const categoryDomain = require("../../category/category.domain");
const activityDomain = require("../../activity/activity.domain");

const countOfMoviesCreatedTodayByUser = async (userId) => {
  const data = await movieDomain.movie.aggregate([
    {
      $match: {
        $expr: {
          $eq: [
            {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            {
              $dateToString: {
                format: "%Y-%m-%d",
                date: new Date(),
              },
            },
          ],
        },
      },
    },
    {
      $count: "count",
    },
  ]);

  return data[0]?.count ?? 0;
};

const isCategoryExists = async (categories) => {
  const result = await categoryDomain.category.get({
    _id: {
      $in: categories,
    },
  });

  return result && result.length === categories.length ? true : false;
};

const createSearchActivity = async (userId, movies) => {
  for (const { _id } of movies.data) {
    await activityDomain.activity.create({
      movie: _id,
      user: userId,
      activity: "SEARCHED",
    });
  }
};

const createSideEffects = async (user, movie) => {
  const users = await userDomain.user.get({ _id: { $ne: user._id } });

  bulkMail(users, "New Movie Published", movie.name);
};

module.exports = {
  countOfMoviesCreatedTodayByUser,
  isCategoryExists,
  createSearchActivity,
  createSideEffects,
};
