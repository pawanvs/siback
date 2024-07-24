const mongoose = require('mongoose');

const Model = mongoose.model('Role');

const read = async (req, res) => {
  // Find document by id
  const result = await Model.findOne({ name: req.params.id })
    .populate('createdBy', 'name')
    .exec();
  // If no results found, return document not found
  if (!result) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No role  found ',
    });
  } else {
    // Return success resposne
    return res.status(200).json({
      success: true,
      result,
      message: 'we found this document ',
    });
  }
};

module.exports = read;
