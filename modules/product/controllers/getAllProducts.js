const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  const productModel = mongoose.model("products");

  const productData = await productModel.find({});
  res.status(200).json({
    status: "Success",
    data: productData,
  });
};

module.exports = getProducts;
