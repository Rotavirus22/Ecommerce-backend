const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category Name is required"],
  },
});

const categoryModel = mongoose.model("categories", categorySchema);

module.exports = categoryModel;
