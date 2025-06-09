require('dotenv/config');

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const api = process.env.API_URL;
console.log('API_URL:', api);
// /api/v1
// app.get(api+'/products', (req, res) =>{
//     res.send('hello Api!'); //exchanging string data with front end
// })

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
require('dotenv/config');

const productSchema = mongoose.Schema({
    name: String,
    image: String, 
    countInStock: {
        type : Number,
        required: true  // to make a data type required
    }
})

const Product = mongoose.model('Product', productSchema);

//exchaning backend data to front end from get method
app.get(`${api}/products`, async (req, res) =>{
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
app.post(`${api}/products`, (req, res) =>{
    console.log('POST body:', req.body); 
    
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    });

    product.save().then((createdProduct=> {
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
         error: err,
         success: false   
        })
    })
    // res.send(newProduct); 
})

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})

app.listen(3000, ()=>{
    console.log(api);
    console.log('server is running http://localhost:3000')
})
