require("express-async-errors");

const express = require("express");
const cors = require("cors");
const errorHandlers = require("./handlers/errorHandler");
const mongoose = require("mongoose");
const userRoute = require("./modules/users/users.routes");
const categoryRoute = require("./modules/categories/categories.routes");
const productRoute = require("./modules/product/product.routes");
const paymentRoute = require("./modules/payment/payment.routes");

require("dotenv").config();
const app = express();
app.use(cors());

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Mongo Connection Successful");
  })
  .catch(() => {
    console.log("Mongo Connection Failed");
  });

//model Initialization
require("./models/user.model");
require("./models/category.model");
require("./models/product.model");
require("./models/cart.model");
require("./models/order.model");
require("./models/payment.model");

app.use(express.json());

//Routes
app.use("/api/users", userRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/payments", paymentRoute);

app.all("*", (req, res, next) => {
  res.status(400).json({
    status: "failed",
    message: "Not found !!",
  });
});

app.use(errorHandlers);

app.listen(8000, () => {
  console.log("Server Started Successfully");
});
