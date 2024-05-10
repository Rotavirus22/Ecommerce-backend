const express = require("express");
const createProduct = require("./controllers/createProduct");
const upload = require("../../middleware/multer");
const auth = require("../../middleware/auth");
const getProducts = require("./controllers/getAllProducts");
const getSingleProduct = require("./controllers/getSingleProduct");
const getProductByUser = require("./controllers/getProductByUser");
const getProductsByCategories = require("./controllers/getProductByCategories");
const addToCart = require("./controllers/addToCart");
const createOrder = require("./controllers/createOrder");
const getCartItems = require("./controllers/getCartItems");
const getOrderByUser = require("./controllers/getOrderByuser");

const productRoute = express.Router();

productRoute.get("/", getProducts);
productRoute.get("/:product_id", getSingleProduct);
productRoute.get("/user/:user_id", getProductByUser);
productRoute.get("/category/:category_id", getProductsByCategories);

productRoute.use(auth);

productRoute.post(
  "/createProduct",
  upload.single("productImage"),
  createProduct
);
productRoute.get("/cart/getCart", getCartItems);
productRoute.post("/add-to-cart", addToCart);
productRoute.post("/createOrder", createOrder);
productRoute.get("/getOrder/user/:user_id", getOrderByUser);

module.exports = productRoute;
