const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [120, "Name must be less than or equal to 120 characters"],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required"],
      ref: "users",
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
      },
    ],
    imdbUrl: {
      type: String,
      required: [true, "IMDB url is required"],
      trim: true,
      unique: true,
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Director is required"],
      ref: "directors",
    },
    publishAt: {
      type: Date,
      required: [true, "Publish at is required"],
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

module.exports = mongoose.model("movies", schema);
