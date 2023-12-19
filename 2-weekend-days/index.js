#!/usr/bin/env node

const inquirer = require("inquirer");
const isDate = require("./utils/isDate.util");
const findWeekendDays = require("./utils/findWeekendDays.util");

const prompt = inquirer.createPromptModule();
prompt([
  {
    type: "input",
    name: "startDate",
    message: "Please enter start date",
    validate: isDate,
  },
  {
    type: "input",
    name: "endDate",
    message: "Please enter end date",
    validate: isDate,
  },
]).then((answers) => {
  console.log(answers);
  const startDate = new Date(answers.startDate);
  const endDate = new Date(answers.endDate);

  if (startDate > endDate) {
    throw Error("End date must be greater than start date!");
  }

  const weekendsBetweenDates = findWeekendDays(startDate, endDate);
  console.log("Weekends between the dates:");
  weekendsBetweenDates.forEach((entry) => {
    if (entry.dayName === "Saturday") {
      console.log("---------------------");
    }

    console.log(`${entry.date.toISOString().slice(0, 10)}: ${entry.dayName}`);
  });
});
