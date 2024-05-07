const mongoose = require("mongoose");

const getSingleProduct = async (req, res) => {
  const productModel = mongoose.model("products");

  const product_id = req.params;

  const productData = await productModel.findOne({
    _id: req.params.product_id,
  });

  res.status(200).json({
    status: "Success",
    data: productData,
  });
};

module.exports = getSingleProduct;
