const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendSms(to, message) {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE, // Your Twilio number
    to: to
  });
}
