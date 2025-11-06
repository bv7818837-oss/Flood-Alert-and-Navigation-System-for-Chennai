require('dotenv').config();
const twilio = require('twilio');

console.log('Testing Twilio credentials...');
console.log('Account SID:', process.env.TWILIO_ACCOUNT_SID ? '***' : 'Not found');
console.log('Phone Number:', process.env.TWILIO_PHONE_NUMBER || 'Not found');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function testSMS() {
  try {
    console.log('Sending test SMS...');
    const message = await client.messages.create({
      body: 'Test message from Twilio',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+916383213966'  // Your test number
    });
    
    console.log('SMS sent successfully!');
    console.log('Message SID:', message.sid);
  } catch (error) {
    console.error('Error sending SMS:');
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    if (error.moreInfo) console.error('More Info:', error.moreInfo);
  }
}

testSMS();
