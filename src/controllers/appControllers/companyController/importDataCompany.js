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

  // Insert data into MongoDB
  //await Company.insertMany(data);
  for (const row of data) {
    try {
      // Check if the row is unique based on the 'name' field
      const existingDoc = await Company.findOne({ name: row.number });

      // If a document with the same name already exists, skip this row
      if (existingDoc) {
        console.log(`Skipping row with name '${row.number}' because it is not unique.`);
        continue;
      }

      let dataToInsert = { ...row, isClient: true };
      // Insert the row data into MongoDB if it's unique
      let result = await Company.create(dataToInsert);
      console.log(`Inserted row with name '${row.number}' into the database.`, result);

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
