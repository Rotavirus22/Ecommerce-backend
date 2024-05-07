const express = require("express");
const auth = require("../../middleware/auth");
const createCategory = require("./controllers/createCategory");
const getCategory = require("./controllers/getCategory");

const categoryRoute = express.Router();

categoryRoute.get("/getCategory", getCategory);

categoryRoute.use(auth);

categoryRoute.post("/createCategory", createCategory);

module.exports = categoryRoute;
