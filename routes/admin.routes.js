const express = require("express");
const csrf = require("csurf");
const csrfProtection = csrf();
const router = express.Router();
const imageUploadMiddleware = require("../middlewares/image-upload");
const adminController = require("../controllers/admin.controller");
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.get("/products", adminController.getProducts);

router.get("/products/new", adminController.getNewProducts);

router.post(
  "/products",
  imageUploadMiddleware.imageUploadMiddleware,
  adminController.createNewProducts
);

router.get("/products/:id", adminController.getUpdateProduct);
router.post(
  "/products/:id",
  imageUploadMiddleware.imageUploadMiddleware,
  adminController.updateProduct
);

router.delete("/products/:id", adminController.deleteProduct);
module.exports = router;

router.get("/orders", adminController.getOrders);

router.post("/orders/:id", adminController.updateOrder);
