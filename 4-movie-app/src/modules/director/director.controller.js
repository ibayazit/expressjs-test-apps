const responder = require("../../utils/responder.util");
const paginator = require("../../utils/database-pagination.util");
const directorDomain = require("./director.domain");

const getDirectors = responder(async (req, res) => {
  const filterStages = [];

  if (req.query.search) {
    filterStages.push({
      $match: {
        name: new RegExp(req.query.search, "i"),
      },
    });
  }

  const directors = await paginator(directorDomain.director, filterStages, req);

  return {
    data: directors,
  };
});

const createDirector = responder(async (req, res) => {
  const director = await directorDomain.director.create(req.body);

  return {
    data: director,
    status: 201,
  };
});

const getDirector = responder(async (req, res) => {
  const director = await directorDomain.director.findById(req.params.id);

  return {
    data: director,
    status: director ? 200 : 404,
  };
});

const updateDirector = responder(async (req, res) => {
  const director = await directorDomain.director.updateById(
    req.params.id,
    req.body
  );

  return {
    data: director,
    status: director ? 200 : 404,
  };
});

const deleteDirector = responder(async (req, res) => {
  const director = await directorDomain.director.deleteById(req.params.id);

  return {
    data: director,
    status: director ? 200 : 404,
  };
});

module.exports = {
  getDirectors,
  getDirector,
  createDirector,
  updateDirector,
  deleteDirector,
};
