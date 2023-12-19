const mongoose = require("mongoose");
const responder = require("../../utils/responder.util");
const userDomain = require("../user/user.domain");
const { generateAccessToken } = require("../../utils/jwt.util");
const { mail } = require("../../helper/notification.helper");
const randomNumber = require("../../helper/random-number.helper");

const attempt = async (user, password) => {
  const checkPassword = await user.comparePassword(password);

  if (!checkPassword) {
    throw new Error("User not found or password does not match");
  }

  return {
    data: {
      user: {
        id: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        createdAt: user.createdAt,
      },
      access_token: generateAccessToken(user.toObject()),
    },
    status: user ? 200 : 404,
  };
};

const login = responder(async (req, res) => {
  const user = await userDomain.user.findBy({ email: req.body.email });

  if (!user || user.verifiedAt === null) {
    throw new Error("User not found or password does not match");
  }

  return attempt(user, req.body.password);
});

const verificationCode = randomNumber();

const register = responder(async (req, res) => {
  const data = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    verificationCode,
  };

  const user = await userDomain.user.create(data);
  mail(user.email, "Verify your account", verificationCode);

  return {
    message: "Your account created. Please verify your account.",
    status: 201,
  };
});

const verify = responder(async (req, res) => {
  const user = await userDomain.user.findBy({ email: req.body.email });

  if (!user) {
    throw new Error("User not found!");
  }

  if (user && user.verificationCode === null) {
    throw new Error("User already verified!");
  }

  if (user && user.verificationCode != req.body.code) {
    throw new Error("Verification code is incorrect!");
  }

  await userDomain.user.updateById(new mongoose.Types.ObjectId(user._id), {
    verificationCode: null,
    verifiedAt: new Date(),
  });

  return {
    message: "Your account verified.",
  };
});

const user = responder(async (req, res) => {
  return {
    data: req.user,
  };
});

module.exports = {
  login,
  register,
  verify,
  user,
};
