import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'



const router = express.Router()

// @desc Fetch all products
// @route GET /api/product
// access Public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json({products})
}))




// @desc Fetch all products
// @route GET /api/product/:id
// access Public
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params._id)

    if(product) {
        res.json(product)
    } else {
        res.status(404).json({ message: "Product not found"})
    }

    // const product = products.find(p => p._id === req.params._id);
    // res.json(product)       // res.data
    // res.json({product}) res.data.products
}))





export default router