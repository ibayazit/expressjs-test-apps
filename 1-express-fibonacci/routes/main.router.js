const express = require("express");
const router = express.Router();
const Fibonacci = require("../utils/fibonacci.util");

router.post("/calculate", (req, res) => {
  const fibonacciInstance = new Fibonacci();
  const sequenceLength = 10000000;

  const fibonacciSequence = fibonacciInstance.generateSequence(sequenceLength);

  res.json(fibonacciSequence);
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

module.exports = router;
