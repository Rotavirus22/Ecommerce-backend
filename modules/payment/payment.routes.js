const express = require("express");
const initializeKhalti = require("./controllers/initialize-khalti");
const completeKhalti = require("./controllers/complete-khalti");
const auth = require("../../middleware/auth");

const paymentRoute = express.Router();

paymentRoute.use(auth);

paymentRoute.post("/initialize-khalti-payment", initializeKhalti);
paymentRoute.get("/complete-khalti-payment", completeKhalti);

module.exports = paymentRoute;
