const mongoose = require("mongoose");

const createCategory = async (req, res) => {
  const userModel = mongoose.model("users");
  const categoryModel = mongoose.model("categories");

  const { name } = req.body;

  if (!name) throw "Category Name is required";

  try {
    await categoryModel.create({
      name: name,
    });

    res.status(200).json({
      status: "Success",
      message: "Category created Successfully",
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};
module.exports = createCategory;
