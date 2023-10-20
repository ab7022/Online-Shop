    const express = require("express");
    const router = express.Router();
    const cartController = require("../controllers/cart.controller");
    router.use(express.urlencoded({ extended: false }));

    // Use the `addCartItem` function as the callback for the POST route
    router.post("/items/:prodId", cartController.addCartItem);

    module.exports = router;
    