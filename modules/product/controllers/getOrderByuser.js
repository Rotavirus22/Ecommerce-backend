const mongoose = require("mongoose");

const getOrderByUser = async (req, res) => {
  const orderModel = mongoose.model("order");

  const orderData = await orderModel.find({
    user_id: req.params.user_id,
  });

  if (!orderData || orderData.length === 0) {
    return res.status(404).json({
      status: "Failed",
      message: "No Order found for the specified user",
    });
  }
  res.status(200).json({
    status: "Success",
    data: orderData,
  });
};

module.exports = getOrderByUser;
