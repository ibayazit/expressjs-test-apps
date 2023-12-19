const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [60, "Name must be less than or equal to 60 characters"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      trim: true,
      maxlength: [60, "Surname must be less than or equal to 60 characters"],
    },
    imdbUrl: {
      type: String,
      required: [true, "IMDB url is required"],
      trim: true,
      unique: true,
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

module.exports = mongoose.model("directors", schema);
