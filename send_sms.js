// Load environment variables from .env file
require('dotenv').config();
const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(to, message) {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    console.log('SMS sent successfully:', result.sid);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error.message);
    return false;
  }
}

// Example usage
// sendSMS('+1234567890', 'Test message from Chennai Flood Alert System');

module.exports = { sendSMS };
