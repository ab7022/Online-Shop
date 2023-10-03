const { FindCursor } = require("mongodb");
const mongoose = require('mongoose');
const express = require('express');
const csrf = require('csurf');
const csrfProtection = csrf();
const router = express.Router();
router.use(csrfProtection);

const Product = require("../models/product.model")
async function getProducts(req, res,next) {
    try {
        const products = await Product.findAll()
        res.render("admin/products/all-products",{products:products});
    } catch (error) {
        next(error)
        return
    }
 
}

function getNewProducts(req, res) {
    res.render("admin/products/new-products");
}

async function createNewProducts(req, res,next) {
     const product = new Product({
        ...req.body,
        image:req.file.filename
     })
     try {
        await product.save()

     } catch (error) {
        next(error)
        return
     }
    res.redirect("/admin/products");
}

async function getUpdateProduct(req, res, next) {
    try {
        const productId = new mongoose.Types.ObjectId(req.params.id); // Use 'new' here
        const product = await Product.findById(productId);
        res.render("admin/products/update-product", { product: product });
    } catch (error) {
        next(error);
    }
}

async function updateProduct(req,res,next) {
    const product = new Product({
        ...req.body,
        _id:req.params.id
    })
    if(req.file){
        product.replaceImage(req.file.filename)
    }
    try {
        await product.save()
    } catch (error) {
        next(error)
        return 
    }
    res.redirect("/admin/products")
}

async function deleteProduct(req, res, next) {
    try {
        const productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }
        console.log("productId:", productId);
        console.log("csrfToken:", _csrfToken());
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.remove();
        res.json({ message: "Deleted Product!" });
    } catch (error) {
        next(error);
    }
}




module.exports = {
    getProducts,
    getNewProducts,
    createNewProducts,
    getUpdateProduct:getUpdateProduct,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct
};
