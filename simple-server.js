require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('.'));

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post('/send-sms', async (req, res) => {
  try {
    const { to, message } = req.body;
    if (!to || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    console.log('SMS sent:', result.sid);
    res.json({ success: true, sid: result.sid });
    
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Failed to send SMS', details: error.message });
  }
});

// Serve the main HTML file for all other GET requests
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'flood copy.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
