module.exports = function responseTime(req, res, next) {
  console.time("handler name");

  res.once("finish", () => {
    console.timeEnd("handler name");
  });
  next();
};
