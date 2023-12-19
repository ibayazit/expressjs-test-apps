module.exports = async (model, options = [], req) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 1;
  const filterStages = [
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: (page - 1) * pageSize,
    },
    {
      $limit: pageSize,
    },
  ];

  filterStages.push(...options);

  const totalDocuments = await model.countDocuments();
  const totalPages = Math.ceil(totalDocuments / pageSize);

  const data = await model.aggregate(filterStages);

  return {
    data,
    currentPage: page,
    totalPages,
    pageSize,
    totalDocuments,
  };
};
