const mongoose = require("mongoose");

const getCartItems = async (req, res) => {
  const cartModel = mongoose.model("carts");

  console.log(req.user._id);

  try {
    const cartData = await cartModel.find({
      user_id: req.user._id,
    });

    res.status(200).json({
      status: "Success",
      data: cartData,
    });
  } catch (e) {
    console.error("Error retrieving cart items:", error);
    res.status(500).json({
      status: "Error",
      message: "Internal server error",
    });
  }
};

module.exports = getCartItems;
