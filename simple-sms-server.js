require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes
app.use(express.json());
app.use(express.static('.'));

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Log environment variables
console.log('Environment variables loaded:');
console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID ? '***' : 'Not found');
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN ? '***' : 'Not found');
console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER || 'Not found');

// Test endpoint
app.get('/test', (req, res) => {
  res.json({
    status: 'Server is running',
    time: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// SMS endpoint
app.post('/send-sms', async (req, res) => {
  console.log('SMS request received:', { 
    to: req.body.to,
    message: req.body.message ? req.body.message.substring(0, 30) + '...' : 'No message'
  });

  try {
    const { to, message } = req.body;
    
    if (!to || !message) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields',
        details: { to: !!to, message: !!message }
      });
    }

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    console.log('SMS sent successfully:', { 
      sid: result.sid,
      to: to,
      timestamp: new Date().toISOString()
    });
    
    res.json({ 
      success: true, 
      sid: result.sid,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error sending SMS:', {
      error: error.message,
      code: error.code,
      details: error.moreInfo || 'No additional error info'
    });
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send SMS',
      message: error.message,
      code: error.code
    });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'flood copy.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Test endpoint: http://localhost:3000/test');
});
