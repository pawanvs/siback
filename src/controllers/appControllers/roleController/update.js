const mongoose = require('mongoose');
const Role = mongoose.model('Role'); // Ensure 'Role' schema is defined

const update = async (req, res) => {
  try {
    const body = req.body;

    console.log(req.params.id);

    const role = await Role.findById(req.params.id);

    console.log(role);

    // Find document by _id instead of id, unless explicitly stored as id
    const result = await Role.findOneAndUpdate(
      { _id: req.params.id }, // Use _id for MongoDB documents
      body,
      { new: true } // Return the updated document
    ).exec();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Role not found or already removed',
      });
    }

    // Returning successful response
    return res.status(200).json({
      success: true,
      result,
      message: 'Role Updated',
    });
  } catch (error) {
    // Handle errors
    return res.status(500).json({
      success: false,
      message: 'Error updating role',
      error: error.message,
    });
  }
};

module.exports = update;
