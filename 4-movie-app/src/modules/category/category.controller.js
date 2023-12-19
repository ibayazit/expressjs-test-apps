const responder = require("../../utils/responder.util");
const paginator = require("../../utils/database-pagination.util");
const categoryDomain = require("./category.domain");

const getCategories = responder(async (req, res) => {
  const filterStages = [];

  if (req.query.search) {
    filterStages.push({
      $match: {
        name: new RegExp(req.query.search, "i"),
      },
    });
  }

  const categories = await paginator(
    categoryDomain.category,
    filterStages,
    req
  );

  return {
    data: categories,
  };
});

const createCategory = responder(async (req, res) => {
  const category = await categoryDomain.category.create(req.body);

  return {
    data: category,
    status: 201,
  };
});

const getCategory = responder(async (req, res) => {
  const category = await categoryDomain.category.findById(req.params.id);

  return {
    data: category,
    status: category ? 200 : 404,
  };
});

const updateCategory = responder(async (req, res) => {
  const category = await categoryDomain.category.updateById(
    req.params.id,
    req.body
  );

  return {
    data: category,
    status: category ? 200 : 404,
  };
});

const deleteCategory = responder(async (req, res) => {
  const category = await categoryDomain.category.deleteById(req.params.id);

  return {
    data: category,
    status: category ? 200 : 404,
  };
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
