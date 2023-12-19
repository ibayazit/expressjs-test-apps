const express = require("express");
const app = express();

app.use((req, res, next) => {
  req.startTime = new Date();
  next();
});

app.get("/", (req, res) => {
  setTimeout(() => {
    res.send("Hello, World!");
    logRequestTime(req.startTime);
  }, 1000);
});

app.use((req, res, next) => {
  req.endTime = new Date();
  next();
});

function logRequestTime(startTime) {
  console.log(`Request processed in ${new Date() - startTime} milliseconds`);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
