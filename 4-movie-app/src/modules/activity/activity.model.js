const mongoose = require("mongoose");
const { activityTypes } = require("./enums");

const schema = mongoose.Schema(
  {
    activity: {
      type: String,
      enum: activityTypes,
      default: activityTypes.SEARCHED,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

schema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { deletedAt: { $eq: null } } });
  next();
});

module.exports = mongoose.model("activities", schema);
