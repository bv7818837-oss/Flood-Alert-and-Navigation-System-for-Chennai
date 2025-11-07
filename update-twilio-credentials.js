const fs = require('fs');
const path = require('path');

// Files that need to be updated
const filesToUpdate = [
  'test-twilio-direct-v2.js',
  'test-twilio-direct.js',
  'verify-twilio-credentials.js',
  'verify-twilio.js'
];

// Update each file
filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace hardcoded credentials with environment variables
      content = content.replace(
        /const accountSid = '[^']*';/,
        'const accountSid = process.env.TWILIO_ACCOUNT_SID;'
      );
      
      content = content.replace(
        /const authToken = '[^']*';/,
        'const authToken = process.env.TWILIO_AUTH_TOKEN;'
      );
      
      // Save the updated file
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${file}`);
    } else {
      console.log(`⚠️  File not found: ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${file}:`, error.message);
  }
});

console.log('\n✅ All files have been updated. Please make sure to:');
console.log('1. Create a .env file with your Twilio credentials');
console.log('2. Add .env to your .gitignore file');
console.log('3. Never commit your .env file to version control');
