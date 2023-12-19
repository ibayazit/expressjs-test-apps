const app = require("../../src/main");
const mongoose = require("mongoose");

module.exports = async () => {
  try {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;
    // const host = process.env.MONGO_HOST;
    const host = "localhost";
    // const databaseName = process.env.MONGO_DATABASE;
    const databaseName = process.env.MONGO_TEST_DATABASE;

    await mongoose.connect(
      `mongodb://${username}:${password}@${host}:27017/${databaseName}?authSource=admin`
    );

    return {
      app,
      mongoose,
    };
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
