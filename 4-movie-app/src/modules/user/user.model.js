const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

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
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      maxlength: [60, "Password must be less than or equal to 60 characters"],
      minlength: [4, "Password must be greater than or equal to 40 characters"],
    },
    verificationCode: {
      type: String,
      trim: true,
    },
    verifiedAt: {
      type: Date,
      default: null,
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

schema.pre(["save", "findOneAndUpdate"], function (next) {
  const user = this.password ? this : this._update;

  if (!user.password) {
    next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;

      next();
    });
  });
});

schema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("users", schema);
