    const Product = require("../models/product.model");
    const Cart = require("../models/cart.model");
    const express = require("express");
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.static("public"));
    function getCart(req, res) {
        res.render("customer/cart/cart");
    }

    async function addCartItem(req, res, next) {
        console.log("addCartItem function called");

        try {
            const prodId = req.params.prodId;
            const product = await Product.findById(prodId);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            let cart = res.locals.cart;

            if (!cart) {
                cart = new Cart();
            }

            cart.addItem(product);
            req.session.cart = cart;

            res.status(201).json({
                message: "Cart Updated",
                newTotalItems: cart.totalQuantity
            });
        } catch (error) {
            next(error);
        }
    }

    async function updateCartItem(req, res) {
        console.log("updateCartItem function called");

        const productid = req.body.productid;
        const newQuantity = req.body.newQuantity; 
        console.log("new quantity is:",newQuantity)
        console.log("product id is:",productid)
        const cart = res.locals.cart;
        const updatedItemData = cart.updateItem(productid, +newQuantity);
        console.log("updated item data is:",updatedItemData)
     
        req.session.cart = cart;
        console.log(cart)
        res.json({
            message: "Item Updated",
            updateCartData: {
                newTotalQuantity: cart.totalQuantity,
                newTotalPrice: cart.totalPrice,
                updateItemPrice: updatedItemData.updatedItemPrice
                
            }
        });
    }

    module.exports = {
        addCartItem: addCartItem,
        getCart: getCart,
        updateCartItem: updateCartItem
    };
