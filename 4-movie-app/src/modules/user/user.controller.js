const responder = require("../../utils/responder.util");
const userDomain = require("./user.domain");
const paginator = require("../../utils/database-pagination.util");
const randomNumber = require("../../helper/random-number.helper");

const getUsers = responder(async (req, res) => {
  const filterStages = [];

  if (req.query.search) {
    filterStages.push({
      $match: {
        name: new RegExp(req.query.search, "i"),
      },
    });
  }

  const users = await paginator(userDomain.user, filterStages, req);

  return {
    data: users,
  };
});

const createUser = responder(async (req, res) => {
  const verificationCode = randomNumber();

  const user = await userDomain.user.create({ ...req.body, verificationCode });

  return {
    data: user,
    status: 201,
  };
});

const getUser = responder(async (req, res) => {
  const user = await userDomain.user.findById(req.params.id);

  return {
    data: user,
    status: user ? 200 : 404,
  };
});

const updateUser = responder(async (req, res) => {
  const user = await userDomain.user.updateById(req.params.id, req.body);

  return {
    data: user,
    status: user ? 200 : 404,
  };
});

const deleteUser = responder(async (req, res) => {
  const user = await userDomain.user.deleteById(req.params.id);

  return {
    data: user,
    status: user ? 200 : 404,
  };
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
