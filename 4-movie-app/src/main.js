require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { authMiddleware, isAuth } = require("./utils/jwt.util");
const routeValidationError = require("./utils/validation-error.util");
const logger = require("./helper/logger.helper");
const { consumeQueues } = require("./providers/queue/queue-receiver.provider");

const routeNotFound = require("./utils/not-found.util");
const routeWelcome = require("./modules/welcome/welcome.router");
const routeAuth = require("./modules/auth/auth.router");
const routeUser = require("./modules/user/user.router");
const routeCategory = require("./modules/category/category.router");
const routeDirector = require("./modules/director/director.router");
const routeMovie = require("./modules/movie/movie.router");
const routeActivity = require("./modules/activity/activity.router");

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);

app.use("/", routeWelcome);
app.use("/auth", routeAuth);
app.use("/users", isAuth, routeUser);
app.use("/directors", isAuth, routeDirector);
app.use("/categories", isAuth, routeCategory);
app.use("/movies", isAuth, routeMovie);
app.use("/activities", isAuth, routeActivity);
app.use(routeNotFound);
app.use(routeValidationError);

const start = async () => {
  try {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST;
    const databaseName = process.env.MONGO_DATABASE;

    await mongoose
      .connect(
        `mongodb://${username}:${password}@${host}:27017/${databaseName}?authSource=admin`
      )
      .then(() => logger("Main", "Connected to the database"));

    consumeQueues();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.env.NODE_ENV === "production") {
  start();
}

module.exports = app;
