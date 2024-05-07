const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    user_name: {
      type: String,
    },
    product_name: {
      type: String,
      required: [true, "Product name is required"],
    },
    product_description: {
      type: String,
      required: [true, "Product Description is required"],
    },
    product_image: {
      type: String,
      default:
        "https://www.vadenjewelers.com/wp-content/themes/divide-3.3/media/product-placeholder.jpg",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    old_price: {
      type: Number,
      required: true,
    },
    new_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
