require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// Serve static files from current directory
app.use(express.static('.'));

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// SMS endpoint
app.post('/send-sms', async (req, res) => {
  try {
    const { to, message } = req.body;
    if (!to || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await client.messages.create({
      body: message,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: to
    });

    console.log('SMS sent:', result.sid);
    res.json({ success: true, sid: result.sid });
    
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Failed to send SMS', details: error.message });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'flood copy.html'));
});

// Start the server
const PORT = 3002; // Using port 3002 as it's available
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Main page: http://localhost:${PORT}/flood%20copy.html`);
  console.log('Press Ctrl+C to stop the server');
});
