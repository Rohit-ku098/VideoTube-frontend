function getAge(createdTime) {
  const currentTime = new Date();
  const createdDate = new Date(createdTime);

  const timeDifference = currentTime - createdDate;

  const millisecondsPerMinute = 60 * 1000;
  const millisecondsPerHour = 60 * millisecondsPerMinute;
  const millisecondsPerDay = 24 * millisecondsPerHour;
  const millisecondsPerMonth = 30 * millisecondsPerDay;
  const millisecondsPerYear = 365 * millisecondsPerDay;

  const years = Math.floor(timeDifference / millisecondsPerYear);
  const months = Math.floor(
    (timeDifference % millisecondsPerYear) / millisecondsPerMonth
  );
  const days = Math.floor(
    ((timeDifference % millisecondsPerYear) % millisecondsPerMonth) /
      millisecondsPerDay
  );
  const hours = Math.floor(
    (((timeDifference % millisecondsPerYear) % millisecondsPerMonth) %
      millisecondsPerDay) /
      millisecondsPerHour
  );
  const minutes = Math.floor(
    ((((timeDifference % millisecondsPerYear) % millisecondsPerMonth) %
      millisecondsPerDay) %
      millisecondsPerHour) /
      millisecondsPerMinute
  );

  if (years > 0) {
    return years + (years === 1 ? " year" : " years");
  } else if (months > 0) {
    return months + (months === 1 ? " month" : " months");
  } else if (days > 0) {
    return days + (days === 1 ? " day" : " days");
  } else if (hours > 0) {
    return hours + (hours === 1 ? " hour" : " hours");
  } else {
    return minutes + (minutes === 1 ? " minute" : " minutes");
  }
}

export {getAge}