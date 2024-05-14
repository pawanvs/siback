const mongoose = require('mongoose');
const path = require('path');
const xlsx = require('xlsx');

const Invoice = mongoose.model('Invoice');

const Client = mongoose.model('Client');

const Company = mongoose.model('Company');

const importData = async (Model, req, res) => {
  // Get the current working directory
  const currentDirectory = process.cwd();

  // Define a relative path
  const relativePath = req.upload.filePath;

  // Create an absolute path by joining the current working directory with the relative path
  const absolutePath = path.join(currentDirectory, 'src', relativePath);

  const workbook = xlsx.readFile(absolutePath);

  // // Assuming only one sheet in the Excel file
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);



  const mapping =  { "Invoice Number"  :  'number' , 'Invoice Date' :  'date'  , "Due Date" :  'dueDate' ,   "Terms" : "description"   ,
  "Invoice Description"  : 'description' , "Net Due" : "netDue" , "Invoice Amount" : "total"}  
  //
  //
  // Insert data into MongoDB
  //await Company.insertMany(data);
  for (const row of data) {
    try {
      
      let edata = {}
      for (let key in mapping) {
        
        edata[mapping[key]] =  row[key];
      }

      edata.isOverdue = true;
      // Update the record
      const result = await Invoice.updateOne({ number: edata.number }, { $set: edata });
      console.log(result);
      continue;

    } catch (error) {
      console.error('Error processing row:', error);
    }
  }

  console.log('Data imported successfully.');

  return res.status(200).json({
    success: true,
    message: data,
    r: req.upload,
  });
};
module.exports = importData;
