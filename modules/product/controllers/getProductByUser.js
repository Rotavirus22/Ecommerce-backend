const mongoose = require("mongoose");

const getProductByUser = async (req, res) => {
  const productModel = mongoose.model("products");

  try {
    const productData = await productModel.find({
      user_id: req.params.user_id,
    });

    if (!productData || productData.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "No Product found for the specified user",
      });
    }

    res.status(200).json({
      status: "Success",
      data: productData,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "Error",
      message: "Internal server error",
    });
  }
};
module.exports = getProductByUser;
