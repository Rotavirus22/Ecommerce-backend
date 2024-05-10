const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const login = async (req, res) => {
  const userModel = mongoose.model("users");

  const { email, password } = req.body;

  if (!email) throw "Email must be provided";
  if (!password) throw "Password must be Provided";

  const getUser = await userModel.findOne({
    email: email,
  });

  if (!getUser) throw "Email doesnot exist in our system";

  const comparePassword = await bcrypt.compare(password, getUser.password);

  if (!comparePassword) throw "Email and password donot match";

  const accessToken = jwtManager(getUser);
  console.log(accessToken);

  res.status(200).json({
    status: "Success",
    message: "User Logged in Successfully",
    accessToken: accessToken,
  });
};
module.exports = login;
