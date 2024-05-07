const mongoose = require("mongoose");
const categoryModel = require("../../../models/category.model");
const productModel = require("../../../models/product.model");
const cloudinary = require("../../../utils/cloudinary");
const fs = require("fs");

const createProduct = async (req, res) => {
  const userModel = mongoose.model("users");
  const categoryModel = mongoose.model("categories");
  const productModel = mongoose.model("products");
  const { productName, productDescription, catagoryId, oldPrice, newPrice } =
    req.body;

  if (!productName) throw "Product name is required";
  if (!productDescription || productDescription.length < 10)
    throw "Product Description must be  of minimum 10 letters";
  if (!oldPrice) throw "Old Price is required";
  if (!newPrice) throw "New Price is required";

  try {
    const category = await categoryModel.findById(catagoryId);

    if (!category) {
      return res.status(404).json({
        status: "Error",
        message: "Category not found",
      });
    }

    const getUser = await userModel.findOne({
      _id: req.user._id,
    });

    if (!req.file) {
      return res
        .status(400)
        .json({ status: "failed", message: "No image uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    const imageBuffer = fs.readFileSync(req.file.path);

    const createProducts = await productModel.create({
      user_id: req.user._id,
      product_name: productName,
      user_name: getUser.fullName,
      product_description: productDescription,
      product_image: result.secure_url,
      category_id: catagoryId,
      old_price: oldPrice,
      new_price: newPrice,
    });

    res.status(200).json({
      status: "Success",
      message: "Product created Successfully",
    });

    fs.unlinkSync(req.file.path);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "Error",
      message: "Internal Server error",
    });
  }
};

module.exports = createProduct;
