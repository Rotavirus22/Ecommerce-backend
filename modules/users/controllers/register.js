const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");

const register = async (req, res) => {
  const userModel = mongoose.model("users");

  const { fullName, email, password, confirm_password } = req.body;

  if (!fullName) throw "Full name must be provided";
  if (!password) throw "Password must be provided";
  if (!email) throw "Email must be provided";
  if (password.length < 5) throw "Password must be more than 5 characters";
  if (password != confirm_password)
    throw "Password and confirm password donot match";

  const getDuplicateEmail = await userModel.findOne({
    email: email,
  });

  if (getDuplicateEmail) throw "Email already exists";

  const hashedPassword = await bcrypt.hash(password, 12);

  const createdUser = await userModel.create({
    fullName: fullName,
    email: email,
    password: hashedPassword,
  });

  const accessToken = jwtManager(createdUser);
  res.status(201).json({
    status: "User registered successfully !!",
    accessToken: accessToken,
  });
};

module.exports = register;
