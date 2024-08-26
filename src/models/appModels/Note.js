const mongoose = require('mongoose');

// Define the Note schema
const roleSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  removed: {
    type: Boolean,
    default: false,
  },
  createdBy: { 
    type: mongoose.Schema.ObjectId, 
    ref: 'Admin', 
  
  },
  created: {
    type: Date,
    default: Date.now,
  },
  
 InvoiceNumber: String
});

// Export the Note model

roleSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Note', roleSchema);
