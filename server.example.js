require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const path = require('path');
const cors = require('cors');
const floodPrediction = require('./flood-prediction');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Log environment variables (remove in production)
console.log('Environment variables from process.env:');
console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID ? '***' : 'Not found');
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN ? '***' : 'Not found');
console.log('TWILIO_PHONE_NUMBER:', process.env.TWILIO_PHONE_NUMBER || 'Not found');

// Log the actual .env file contents
const fs = require('fs');
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  console.log('Contents of .env file:');
  console.log(envContent.split('\n').map(line => {
    if (line.includes('AUTH_TOKEN') || line.includes('ACCOUNT_SID')) {
      return line.split('=')[0] + '=***';
    }
    return line;
  }).join('\n'));
} catch (error) {
  console.error('Error reading .env file:', error.message);
}

// Hardcoded Twilio credentials for testing
const accountSid = "YOUR_TWILIO_ACCOUNT_SID";
const authToken = "YOUR_TWILIO_AUTH_TOKEN";
const twilioPhoneNumber = '+15419815667';

console.log('Initializing SMS service with Twilio credentials:');
console.log('Account SID:', accountSid);
console.log('Phone Number:', twilioPhoneNumber);

// Initialize Twilio client
const client = require('twilio')(accountSid, authToken);

// Function to send SMS using Twilio client
async function sendSMS(to, message) {
  try {
    console.log(`Sending SMS to ${to} with message: ${message.substring(0, 30)}...`);
    
    const messageResult = await client.messages.create({
      body: message,
      from: "YOUR_TWILIO_PHONE_NUMBER"
      to: to
    });
    
    console.log('SMS sent successfully:', {
      sid: messageResult.sid,
      status: messageResult.status,
      dateCreated: messageResult.dateCreated
    });
    
    return {
      success: true,
      sid: messageResult.sid,
      status: messageResult.status,
      data: messageResult
    };
  } catch (error) {
    console.error('Error sending SMS:', {
      code: error.code,
      message: error.message,
      moreInfo: error.moreInfo,
      status: error.status,
      fullError: JSON.stringify(error, null, 2)
    });
    
    throw {
      success: false,
      error: 'Failed to send SMS',
      details: error.message || 'Unknown error',
      code: error.code,
      status: error.status
    };
  }
}

// API endpoint to send SMS
app.post('/send-sms', async (req, res) => {
  console.log('Received SMS request:', { body: req.body });
  
  try {
    const { to, message } = req.body;
    
    // Validate input
    if (!to || !message) {
      console.error('Missing required fields');
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields',
        details: { to: !!to, message: !!message }
      });
    }

    console.log(`Attempting to send SMS to: ${to}`);
    
    // Initialize Twilio client inside the endpoint to ensure fresh credentials
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Send SMS using Twilio
    const result = await client.messages.create({
      body: message,
      from: "YOUR_TWILIO_PHONE_NUMBER"
      to: to
    });

    console.log('SMS sent successfully:', { 
      sid: result.sid,
      to: to,
      messagePreview: message.substring(0, 30) + (message.length > 30 ? '...' : '')
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

// Test endpoint to verify server is running
app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({
    status: 'Server is running',
    time: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    twilioNumber: process.env.TWILIO_PHONE_NUMBER
  });
});

// API endpoint to send SMS
app.post('/send-sms', async (req, res) => {
  console.log('SMS request received:', { body: req.body });
  
  try {
    const { to, message } = req.body;
    
    // Validate input
    if (!to || !message) {
      console.error('Missing required fields');
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields',
        details: { to: !!to, message: !!message }
      });
    }

    console.log(`Attempting to send SMS to: ${to}`);
    
    // Verify the Twilio phone number is set
    if (!twilioPhoneNumber) {
      throw new Error('Twilio phone number is not configured');
    }

    // Send SMS using direct HTTPS request
    console.log(`Sending SMS from ${twilioPhoneNumber} to ${to}`);
    
    try {
      const result = await sendSMS(to, message);
      
      console.log('SMS sent successfully:', { 
        sid: result.sid,
        to: to,
        from: "YOUR_TWILIO_PHONE_NUMBER"
        status: result.status,
        messagePreview: message.substring(0, 30) + (message.length > 30 ? '...' : '')
      });
      
      res.json({ 
        success: true, 
        sid: result.sid,
        status: result.status,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error in sendSMS:', error);
      throw error;
    }
    
  } catch (error) {
    // Log complete error information
    console.error('Full error object:', JSON.stringify(error, null, 2));
    
    // Extract detailed error information
    const errorDetails = {
      message: error.message,
      code: error.code,
      status: error.status,
      response: error.response ? {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      } : 'No response',
      config: error.config ? {
        url: error.config.url,
        method: error.config.method,
        headers: error.config.headers,
        data: error.config.data
      } : 'No config',
      timestamp: new Date().toISOString()
    };
    
    console.error('Error sending SMS:', JSON.stringify(errorDetails, null, 2));
    
    // More specific error handling
    let statusCode = 500;
    let errorMessage = 'Failed to send SMS';
    let errorCode = error.code || 'UNKNOWN_ERROR';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      statusCode = error.response.status || 500;
      errorMessage = error.response.data?.message || error.response.statusText || 'Unknown server error';
      errorCode = error.response.data?.code || errorCode;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from Twilio API';
      errorCode = 'NO_RESPONSE';
    }
    
    if (errorCode === 21211) {
      statusCode = 400; // Bad Request
      errorMessage = 'Invalid phone number format';
    } else if (errorCode === 21608) {
      statusCode = 429; // Too Many Requests
      errorMessage = 'Rate limit exceeded. Please try again later.';
    } else if (errorCode === 20003 || statusCode === 401) {
      statusCode = 401; // Unauthorized
      errorMessage = 'Invalid Twilio credentials';
    }
    
    res.status(statusCode).json({ 
      success: false, 
      error: errorMessage,
      code: errorCode,
      details: error.response?.data || error.message
    });
  }
});

// Serve the main HTML file for all other routes
app.use((req, res) => {
  console.log(`Serving file for path: ${req.path}`);
  res.sendFile(path.join(__dirname, 'flood copy.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(404).send('Page not found');
    }
  });
});

// Flood Prediction Endpoints
const floodPrediction = require('./floodPrediction'); // Import the flood prediction module

app.get('/api/flood-risk/:location', async (req, res) => {
    try {
        const { location } = req.params;
        const prediction = await floodPrediction.predictFloodRisk(location);
        res.json(prediction);
    } catch (error) {
        console.error('Error in /api/flood-risk:', error);
        res.status(500).json({ error: 'Failed to get flood prediction' });
    }
});

app.post('/api/route-risk', async (req, res) => {
    try {
        const { from, to } = req.body;
        if (!from || !to) {
            return res.status(400).json({ error: 'Both "from" and "to" locations are required' });
        }
        const routeRisk = await floodPrediction.getRouteFloodRisk({ from, to });
        res.json(routeRisk);
    } catch (error) {
        console.error('Error in /api/route-risk:', error);
        res.status(500).json({ error: 'Failed to calculate route risk' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Flood prediction API available at http://localhost:${PORT}/api/flood-risk/:location`);
});
