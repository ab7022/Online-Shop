const { FindCursor } = require("mongodb");
const mongoose = require('mongoose');
const express = require('express');
const csrf = require('csurf');
const csrfProtection = csrf();
const router = express.Router();
const Order = require("../models/order.model")

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
        const productId = new mongoose.Types.ObjectId(req.params.id); 
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
    let product
    const productId = req.params.id;
    // console.log("Received DELETE request for Product ID:", productId);
    try {
        product = await Product.findById(req.params.id)
        await product.remove()
    } catch (error) {
        return next(error)
    }
    res.json({message:"Deleted Product"})
};

async function getOrders(req,res,next) {
    try {
        const orders = await Order.findAll()
        res.render("admin/orders/admin-orders",
        {
            orders:orders
        })
    } catch (error) {
        
    }
}


async function updateOrder(req,res,next) {
    const orderid = req.params.id
    const newStatus = req.body.status
    console.log("new Status is:",newStatus)

    try {
        const order = await Order.findById(orderid)
        order.status = newStatus

        await order.save()  
        res.json({
            message:"Order Updated",
            newStatus:newStatus
        })
    } catch (error) {
        next(error)
    }
}










module.exports = {
    getProducts,
    getNewProducts,
    createNewProducts,
    getUpdateProduct:getUpdateProduct,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct,
    getOrders:getOrders,
    updateOrder:updateOrder
};
