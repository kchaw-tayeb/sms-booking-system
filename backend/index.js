const bookingHelper = require("./bookingHelper");

const server = require("express")();
const session = require("express-session");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
require("dotenv").config();
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: true }));
server.use(session({ secret: process.env.SESSION_SECRET }));
const port = process.env.EXPRESS_PORT || 3001;

server.get("/test", (req, res) => {
  res.send("hello from express ");
});
server.post("/receive-sms", (req, res) => {
  const messageContent = req.body.Body.toLowerCase();
  const step = req.session.step;
  console.log("body", body);
  console.step("step", step);
  let message;
  if (!step) {
    req.session.step = 1;
    message = `hi , do you want to book an appointment to :\n
     see  the gym \n
     book the personal trainer \n
     book a massage `;
  } else {
    switch (step) {
      case 1:
        message = bookingHelper.matchType(req, messageContent);
        break;
      case 2:
        message = bookingHelper.matchDay(req, messageContent);
        break;
      case 3:
        message = bookingHelper.matchTime(req, messageContent);
        break;
      case 4:
        message = bookingHelper.confirmBooking(req);
      default:
        console.log(`could not find the step for values : ${step}`);
    }
  }
  const twiml = new MessagingResponse();

  twiml.message(message);
  console.log("response", twiml.toString());
  res.set("content-type", "text/xml");
  res.send(twiml.toString());
});
server.listen(port, () => console.log("listening"));
const from = process.env.PHONE_NUMBER;
const to = process.env.MY_NUMBER;
const twilio = require("twilio")(
  process.env.TOKEN_SID,
  process.env.TOKEN_SECRET,
  {
    accountSid: process.env.ACCOUNT_SID,
  }
);
function sendSms() {
  twilio.messages
    .create({
      from,
      to,
      body: "hello from twilio",
    })
    .then((message) => console.log(`message send with sid ${message.sid} `))
    .catch((error) => console.error(error));
}
