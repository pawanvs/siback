const mongoose = require('mongoose');

// Define the Note Role
const roleSchema = new mongoose.Schema({
 
  name: { type: String, required: true },
  permissions: { type: Map, of: Boolean, default: {} },
  createdBy: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Admin',   
  
  },
  created: {
    type: Date,
    default: Date.now,
  }
});

// Export the Note model
module.exports = mongoose.model('Role', roleSchema);
