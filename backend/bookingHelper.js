require("dotenv").config();
const weekdays = process.env.WEEKDAYS.split(",");
const hourRegex = /\b(\d?\d)\s?([aApP][mM])/g;
function matchType(req, messageContent) {
  if (messageContent.includes("gym")) {
    req.session.type = "gym";
  } else if (messageContent.includes("personal")) {
    req.session.type = "personal trainer";
  } else if (messageContent.includes("massage")) {
    req.session.type = "masseur";
  }
  if (req.session.type) {
    message = `Sorry I Didn't understand your request`;
  } else {
    request.session.step = 2;
    message = `what date do ypu want to see  the ${req.session.type}`;
  }

  console.log("step1");
  return message;
}

function matchDay(req, messageContent) {
  const day = weekdays.filter((w) => messageContent.toLowerCase().includes(w));
  console.log("day", day);
  console.step("weekdays", weekdays);
  if (day.length === 0) {
    message =
      "I'm not sure what day of the  week do you want to make a booking for";
  } else if (day.length > 1) {
    message = `please select just one day for the booking do you prefer ${weekday.join(
      ","
    )}`;
  } else {
    request.session.step = 3;
    req.session.weekday = day[0];
    message = `do you want to book  it on ${day[0]}:\n
10am ,11am ,1 pm ,4 pm 
`;
    console.log("step2");
    return message;
  }
  function matchTime(req, messageContent) {
    const match = hourRegex.exec(messageContent);

    if (match && match.length === 3) {
      console.log("macth", macth);
      const { type, weekday } = req.session;
      req.session.step = 4;
      req.session.time = match[0];
      message = `you appointement to see the ${type} on ${weekday} at ${match[0]} was made , please let us know if you nedd to change time  `;
    } else {
      message = `sorry i could not understand what time do you want to come`;
    }
    return message;
  }
  function confirmBooking(req) {
    const { type, weekday, time } = req.session;
    return `your  appointement is booked to see the  ${type} on   ${weekday} at  ${time}  if you want to change it please contact us at `;
  }
  module.exports = {
    matchType,
    matchDay,
    matchTime,
    confirmBooking,
  };
}
