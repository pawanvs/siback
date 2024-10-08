const mongoose = require('mongoose');

const Model = mongoose.model('Note');

console.log("note debug");
const create = async (req, res) => {
  let body = req.body;
  body.removed = false;

  // Creating a new document in the collection
  const result = await new Model(body).save();


  // Returning successfull response
  return res.status(200).json({
    success: true,
    result: result,
    message: 'Note created successfully',
  });
};

module.exports = create;
