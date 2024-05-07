const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const auth = require("../../middleware/auth");
const userDashbaord = require("./controllers/userDashboard");

const userRoute = express.Router();

//routes
userRoute.post("/register", register);
userRoute.post("/login", login);

userRoute.use(auth);

//protected routes
userRoute.get("/dashboard", userDashbaord);

module.exports = userRoute;
