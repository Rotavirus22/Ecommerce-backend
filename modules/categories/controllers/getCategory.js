const mongoose = require("mongoose");

const getCategory = async (req, res) => {
  const categoryModel = mongoose.model("categories");

  const categoryData = await categoryModel.find({});

  res.status(200).json({
    status: "Success",
    data: categoryData,
  });
};

module.exports = getCategory;
