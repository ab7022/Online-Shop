const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post("/", ordersController.addOrder);
router.get("/", ordersController.getOrder);

router.get("/success", ordersController.getSuccess);
router.get("/failure", ordersController.getFailure);

module.exports = router;
