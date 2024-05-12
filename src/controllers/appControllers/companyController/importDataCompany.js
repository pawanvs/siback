const mongoose = require('mongoose');
const path = require('path');
const xlsx = require('xlsx');

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


  const mapping =  { "Customer #": 'number' ,"Customer Name": 'name', 'Account Name':'accountName', "Type"  :  'card_type' , 'Card #' :  'card_number'  , "Expires" :  'expire' ,   "Auto Pay" : "auto_pay"   ,"EFT Hold Date"  : 'eft_hold_date' , 'Print Cycle Inv' : 'print_cyles'}  
  
  const convertExpiryToDate =  (expiry) => {
    // Split the expiry string into month and year parts
    const [month, year] = expiry.split('/').map(str => parseInt(str.trim(), 10));

    // Assuming the day as 1st of the month for consistency
    // Months are 0-based in JavaScript, so subtract 1 from the month
    const expirationDate = new Date(year + 2000, month - 1, 1);

    return expirationDate;
}
  // Insert data into MongoDB
  //await Company.insertMany(data);
  for (const row of data) {
    try {

      let edata = {}
      for (let key in mapping) {
        
        edata[mapping[key]] =  row[key];
      }

      console.log(edata);
      // continue;
      // Check if the row is unique based on the 'name' field
      const existingDoc = await Company.findOne({ name: edata.number });

      // If a document with the same name already exists, skip this row
      if (existingDoc) {
        console.log(`Skipping row with name '${edata.number}' because it is not unique.`);
        continue;
      }
      const expire_date = convertExpiryToDate(edata.expire);
      let dataToInsert = { ...edata, expire_date : expire_date ,isClient: true , payment : {...edata}};
      // Insert the row data into MongoDB if it's unique
      let result = await Company.create(dataToInsert);
      console.log(`Inserted row with name '${edata.number}' into the database.`, result);

      await Client.create({ company: result._id, name: result.name });
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
