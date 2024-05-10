const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  const cartModel = mongoose.model("carts");
  const userModel = mongoose.model("users");
  const productModel = mongoose.model("products");

  const { product_id, quantity } = req.body;

  try {
    const user = await userModel.findOne({
      _id: req.user._id,
    });
    const product = await productModel.findOne({
      _id: product_id,
    });

    if (!product) {
      return res.status(404).json({
        status: "Error",
        message: "Product not found",
      });
    }

    await cartModel.create({
      product_id: product_id,
      product_name: product.product_name,
      product_image: product.product_image,
      user_id: req.user._id,
      user_name: user.fullName,
      price: product.new_price * quantity,
      quantity: quantity,
    });

    res.status(200).json({
      status: "Success",
      message: "Product Added to cart successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "Error",
      message: "Internal Server Failed",
    });
  }
};

module.exports = addToCart;
