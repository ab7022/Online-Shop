    const express = require("express");
    const router = express.Router();
    const cartController = require("../controllers/cart.controller");
    router.use(express.urlencoded({ extended: false }));
    router.use(express.json());


    // Use the `addCartItem` function as the callback for the POST route
    router.get("/",cartController.getCart)
    router.post("/items/update/:productid",cartController.updateCartItem)

    router.post("/items/:prodId", cartController.addCartItem);
    module.exports = router;
    