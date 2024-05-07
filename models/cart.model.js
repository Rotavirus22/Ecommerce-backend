const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: [true, "Product Id is necessary"],
  },
  product_name: {
    type: String,
    required: [true, "Product Name is necessary"],
  },
  product_image: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User name is necessary"],
  },
  user_name: {
    type: String,
    required: [true, "User Name is necessary"],
  },
  price: {
    type: Number,
    required: [true, "Price Amount is necessary"],
  },
});

const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;
