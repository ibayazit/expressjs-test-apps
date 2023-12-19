const request = require("supertest");
const clearDatabaseUtil = require("./setup/utils/clear-database.util");

const initSetup = require("./setup/main.setup");

describe("Auth", () => {
  let app;
  let mongoose;

  beforeAll(async () => {
    const setup = await initSetup();
    app = setup.app;
    mongoose = setup.mongoose;
  });

  afterAll(async () => {
    await clearDatabaseUtil(mongoose);

    await mongoose.disconnect();
  });

  it("Attempts to register route and success", async () => {
    const currentTimestamp = new Date().getTime();

    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "ibrahim",
        surname: "Bayazit",
        email: `john-${currentTimestamp}@doe.com`,
        password: "123123",
      });

    expect(response.status).toBe(201);
  });
});
