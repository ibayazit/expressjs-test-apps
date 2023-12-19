const express = require("express");
const responseTime = require("./utils/response-time.util");
const app = express();

app.use(responseTime);

app.get("/", (req, res) => {
  setTimeout(() => {
    res.send("Hello, World!");
  }, 1000);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
