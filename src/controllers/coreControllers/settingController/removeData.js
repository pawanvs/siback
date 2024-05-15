const mongoose = require('mongoose');
const Model = mongoose.model('Setting');

const removeData = async (req, res) => {

  const Company = require('../../../models/appModels/Company');

  const Client = require('../../../models/appModels/Client');

  const Invoice = require('../../../models/appModels/Invoice');

  const OpenInvoice = require('../../../models/appModels/OpenInvoice');



  await Company.deleteMany();
  await Client.deleteMany();
  await Invoice.deleteMany();
  await OpenInvoice.deleteMany();
  
  return res.status(200).json({
    success: true,
    
    message: 'Successfully purged data',
  });

};

module.exports = removeData;
