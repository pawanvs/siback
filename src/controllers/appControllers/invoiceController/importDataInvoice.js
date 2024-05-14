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



  const mapping =  { "Invoice Number"  :  'number' , 'Date' :  'date'  , "Customer Number" :  'client' ,   "Description" : "description"   ,"Amount"  : 'total'}  
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
      // Check if the row is unique based on the 'name' field
      const companyObj = await Company.findOne({ number: edata.client });

      console.log({ invoice : edata });

      if (companyObj) {
        // console.log({ companyObj: companyObj.id });

        const clientO = await Client.findOne({ company: companyObj.id });

        console.log({ number: clientO.id });

        edata.client = clientO.id;

        const ndata = { ...edata, createdBy: '6637d2b11659dd1a257c1196' , 'currency' : 'USD' , items :[{ itemName : edata.description , description : edata.description , quantity : "1" , total : edata.total , price : edata.total}
          
        ]};
        // // Insert the row data into MongoDB if it's unique
        // // row.client = companyObj.id;
        await Invoice.create(ndata);
        console.log(`Inserted row with name '${row.number}' into the database.`);
      }else if(true){

        edata.client = "664225b63f91b801eec1e015";
        const ndata = { ...edata, createdBy: '6637d2b11659dd1a257c1196' , 'currency' : 'USD' , items :[{ itemName : edata.description , description : edata.description , quantity : "1" , total : edata.total , price : edata.total}
          
        ]};
        // // Insert the row data into MongoDB if it's unique
        // // row.client = companyObj.id;
        await Invoice.create(ndata);
      }
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
