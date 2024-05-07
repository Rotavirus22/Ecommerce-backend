const mongoose = require("mongoose");

const getProductsByCategories = async (req, res) => {
  const productModel = mongoose.model("products");

  const category_id = req.params;

  try {
    const productData = await productModel.find({
      category_id: req.params.category_id,
    });
    res.status(200).json({
      status: "success",
      data: productData,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve products",
    });
  }
};

module.exports = getProductsByCategories;
