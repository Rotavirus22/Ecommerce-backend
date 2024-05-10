const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  const cartModel = mongoose.model("carts");
  const orderModel = mongoose.model("order");
  const userModel = mongoose.model("users");

  const user_id = req.user._id;

  try {
    const cartItems = await cartModel.find({
      user_id: user_id,
    });

    let totalPrice = 0;
    const products = cartItems.map((item) => {
      totalPrice += item.price;

      return {
        product_id: item.product_id,
        product_name: item.product_name,
        product_shop: item.user_id,
        price: item.price,
      };
    });

    const user = await userModel.findOne({
      _id: user_id,
    });

    if (!user) {
      return res.status(404).json({
        status: "Error",
        message: "User not found",
      });
    }
    await orderModel.create({
      user_id: user_id,
      user_name: user.fullName,
      products,
      total_price: totalPrice,
    });

    res.status(200).json({
      status: "Success",
      message: "Order created successfully",
    });

    await cartModel.deleteMany({ user_id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      status: "Error",
      error: "Internal server error",
    });
  }
};

module.exports = createOrder;
