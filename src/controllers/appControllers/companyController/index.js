const mongoose = require('mongoose');
const { modelsFiles } = require('@/models/utils');
const createCRUDController = require('@/controllers/middlewaresControllers/createCRUDController');

const remove = require('./remove');
const update = require('./update');
const importData = require('./importDataCompany');
const importInvoiceData = require('../invoiceController/importDataInvoice');
const importOpenInvoice = require('../openInvoiceController/importOpenInvoice');

const expiredData = require('./expired')
const expiresInMonth = require('./expiresInMonth')

function modelController() {
  const modelName = 'Company';

  if (!modelsFiles.includes(modelName)) {
    throw new Error(`Model ${modelName} does not exist rii`);
  } else {
    const Model = mongoose.model(modelName);
    const InvoiceModel = mongoose.model('Invoice');
    const methods = createCRUDController(modelName);

    methods.delete = (req, res) => remove(Model, req, res);
    methods.update = (req, res) => update(Model, req, res);
    methods.update = (req, res) => update(Model, req, res);
    methods.importData = (req, res) => importData(Model, req, res);
    methods.importInvoiceData = (req, res) => importInvoiceData(InvoiceModel, req, res);
    methods.importOpenInvoice = (req, res) => importOpenInvoice(InvoiceModel, req, res);
    
    methods.expiredData = (req, res) => expiredData(Model, req, res);
    methods.expiresInMonth = (req, res) => expiresInMonth(Model, req, res);


    return methods;
  }
}

module.exports = modelController();
