const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  email: { type: String, required: true },
  secret: { type: String, required: true },
  createdAt: { type: Date, expires: 300, default: Date.now } // OTP expires in 5 minutes (300 seconds)
});
schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('OTP', schema);
