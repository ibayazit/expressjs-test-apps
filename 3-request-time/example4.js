const express = require("express");
const responseTime = require("response-time");
const app = express();

app.use(
  responseTime(function (req, res, time) {
    console.log(`${req.method}: ${time}`);
  })
);

app.get("/", (req, res) => {
  setTimeout(() => {
    res.send("Hello, World!");
  }, 1000);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
