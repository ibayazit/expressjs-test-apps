function findWeekendDays(startDate, endDate) {
  const weekends = [];

  for (const day of getDaysInRange(startDate, endDate)) {
    if (day.getDay() === 0 || day.getDay() === 6) {
      weekends.push({
        date: day,
        dayName: getDayName(day.getDay()),
      });
    }
  }

  return weekends;
}

function getDaysInRange(startDate, endDate) {
  const numberOfDays = (endDate - startDate) / (24 * 60 * 60 * 1000) + 1;
  return Array.from(
    { length: numberOfDays },
    (_, index) => new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000)
  );
}

function getDayName(dayIndex) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek[dayIndex];
}

module.exports = findWeekendDays;
