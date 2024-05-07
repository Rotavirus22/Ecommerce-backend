const mongoose = require("mongoose");

const userDashbaord = async (req, res) => {
  const userModel = mongoose.model("users");

  const getUser = await userModel
    .findOne({
      _id: req.user._id,
    })
    .select("-password");

  res.status(200).json({
    status: "Success",
    data: getUser,
  });
};
module.exports = userDashbaord;
