const mongoose = require('mongoose');
const path = require('path');
const xlsx = require('xlsx');

const OpenInvoice = mongoose.model('OpenInvoice');

const Invoice = mongoose.model('Invoice');

const Client = mongoose.model('Client');

const Company = mongoose.model('Company');

const importData = async (Model, req, res) => {

  // console.log("** magic **");

  // return res.status(200).json({
  //   success: true
    
  // });

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


  const mapping =  { "Invoice Number"  :  'number' , 'Invoice Date' :  'date'  , "Terms" : "terms"   , "Invoice Description" : "description"   ,"Invoice Amount"  : 'total', "Net Due" : "netDue"}  
  
  for (const row of data) {
    try {
      
      let edata = {}
      for (let key in mapping) {
        
        edata[mapping[key]] =  row[key];
      }
      // Check if the row is unique based on the 'name' field
      const invoiceObj = await Invoice.findOne({number : edata.number})



      if (invoiceObj) {
        
       
        edata.client = invoiceObj.client._id;

        console.log("Magic ===>")
        console.log(edata)

      // return res.status(200).json({
      //   success: true,
      //   edata
        
      // });
        // Split the date string into day, month, and year
      // const [day, month, year] = edata.date?.split('/');

       // Create a new Date object
      //  const formattedDate = new Date(`20${year}`, month - 1, day); // Subtract 1 from month since it is zero-based in Date

      //  edata.date = formattedDate;

        const ndata = { ...edata, isOverdue : true , createdBy: '6637d2b11659dd1a257c1196' , 'currency' : 'USD' , items :[{ itemName : edata.description , description : edata.description , quantity : "1" , total : edata.total , price : edata.total}
          
        ]};
        // // Insert the row data into MongoDB if it's unique
        // // row.client = companyObj.id;
        await OpenInvoice.create(ndata);
        console.log(`Inserted row with name '${row.number}' into the database.`);
      }else if(true){


        console.log({ row : row });
        console.log({ invoice : edata });
  
        // Split the date string into day, month, and year
      // const [day, month, year] = edata.date ? edata.date?.split('/') : Date().split('/');

      // Create a new Date object
      // const formattedDate = new Date(`20${year}`, month - 1, day); // Subtract 1 from month since it is zero-based in Date

      // edata.date = formattedDate;
        edata.client = "664225b63f91b801eec1e015";
        const ndata = { ...edata, createdBy: '6637d2b11659dd1a257c1196' , 'currency' : 'USD' , items :[{ itemName : edata.description , description : edata.description , quantity : "1" , total : edata.total , price : edata.total}
          
        ]};
        // // Insert the row data into MongoDB if it's unique
        // // row.client = companyObj.id;
        await OpenInvoice.create(ndata);
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
