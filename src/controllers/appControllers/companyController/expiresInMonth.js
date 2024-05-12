
const expiresInMonth = async (Model, req, res) => {
  const sort = parseInt(req.query.sort) || 'desc';

  //  Query the database for a list of all results
  const today = new Date();
  const oneMonthLater = new Date(today);
  oneMonthLater.setMonth(today.getMonth() + 1);

  const result = await Model.find({
    removed: false,
    expire_date: {
      $gte: today,
      $lt: oneMonthLater
  }
  })
    .sort({ created: sort })
    .populate()
    .exec();

  // const migratedData = result.map((x) => migrate(x));
  if (result.length > 0) {
    return res.status(200).json({
      success: true,
      result: result,
      message: 'Successfully found all documents',
    });
  } else {
    return res.status(203).json({
      success: true,
      result: [],
      message: 'Collection is Empty',
    });
  }
};

module.exports = expiresInMonth;
