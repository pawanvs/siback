require('module-alias/register');
const mongoose = require('mongoose');
const { globSync } = require('glob');
const path = require('path');
const fs = require('fs'); // Import fs to read certificate files
const https = require('https'); // Import https for HTTPS server

// Ensure correct Node.js version
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 20) {
  console.log('Please upgrade your node.js version to at least 20 or greater. 👌\n ');
  process.exit();
}

// Import environmental variables from .env files
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

// Connect to MongoDB
mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', (error) => {
  console.log(`1. 🔥 Common Error: check your .env file first and add your MongoDB URL`);
  console.error(`2. 🚫 Error: ${error.message}`);
});

// Load models
const modelsFiles = globSync('./src/models/**/*.js');
for (const filePath of modelsFiles) {
  require(path.resolve(filePath));
}

// Start Express app
const app = require('./app');
app.set('port', process.env.PORT || 8000);

// Load Let's Encrypt SSL certificates
const httpsOptions = {
  key: fs.readFileSync('niv/privkey1.pem'),   // Private key
  cert: fs.readFileSync('niv/fullchain1.pem'), // Full chain certificate
  ca: fs.readFileSync('niv/chain1.pem'),      // Certificate authority chain (optional)
  };

// Create HTTPS server
const server = https.createServer(httpsOptions, app).listen(app.get('port'), () => {
  console.log(`SI Express HTTPS Server running → On PORT: ${server.address().port}`);
});
