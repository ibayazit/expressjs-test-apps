const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [80, "Title must be less than or equal to 80 characters"],
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

module.exports = mongoose.model("categories", schema);
