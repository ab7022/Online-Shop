const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

async function addCartItem(req, res, next) {
    try {
        const prodId = req.params.prodId;
        console.log("Product ID is:", prodId);

        // if (!prodId) {
        //     return res.status(400).json({ message: 'Product ID not available' });
        // }

        // if (typeof prodId !== 'string') {
        //     return res.status(400).json({ message: 'Product ID must be a string' });
        // }

        console.log("Received Product ID:", prodId);

        const product = await Product.findById(prodId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Get the cart from res.locals or create a new one
        let cart = res.locals.cart;

        if (typeof cart === 'undefined' || cart === null) {
            // Initialize the cart object if it doesn't exist
            cart = new Cart();
            console.log("Cart is undefined");
        }

        cart.addItem(product);
        
        // Optionally, you can update session data here
        req.session.cart = cart;

        res.status(201).json({
            message: "Cart Updated",
            newTotalItems: cart.totalQuantity
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addCartItem: addCartItem
};
