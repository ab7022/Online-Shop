const express = require("express");
const router = express.Router();
const productsController = require("../controllers/product.controller");

router.get("/products", productsController.getAllProduct);

router.get("/products/:id", productsController.getProductDetails);
module.exports = router;
