const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "User id is required"],
    },
    user_name: {
      type: String,
      required: [true, "User name is required"],
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Product id is necessary"],
        },
        product_name: {
          type: String,
          required: [true, "Product Name is necessary"],
        },
        price: {
          type: Number,
          required: [true, "Product Price is necessary"],
        },
      },
    ],
    total_price: {
      type: Number,
      required: [true, "Total Price is necessary"],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
