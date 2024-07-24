const mongoose = require('mongoose');

const Model = mongoose.model('Role');


const update = async (req, res) => {
  let body = req.body;



 
  // Find document by id and updates with the required fields

  const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, body, {
    new: true, // return the new result instead of the old one
  }).exec();

  // Returning successfull response

  return res.status(200).json({
    success: true,
    result,
    message: 'Role Updated',
  });
};

module.exports = update;
