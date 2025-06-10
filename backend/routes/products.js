const Product = require('../models/products')
const express = require('express');
const router = express.Router();

//exchaning backend data to front end from get method
router.get(`/`, async (req, res) =>{
    const productList = await Product.find();

    if(!productList) {
        res.status(500).json({success: false})
    }
    res.send(productList); 
})
// exchaning front end data with backend
// app.post(`${api}/products`, (req, res) =>{
//     const newProduct = req.body;
//     console.log(newProduct);
//     res.send(newProduct); 
// })
router.post(`/`, async (req, res) => {
    console.log('POST body:', req.body); 
    
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });

     try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct); // success response
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }

})

module.exports = router;

