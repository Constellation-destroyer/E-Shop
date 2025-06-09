require('dotenv/config');

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const api = process.env.API_URL;
console.log('API_URL:', api);
const productsRouter = require('./routers/products');
// /api/v1
// app.get(api+'/products', (req, res) =>{
//     res.send('hello Api!'); //exchanging string data with front end
// })

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
require('dotenv/config');

//Routers
app.use(`${api}/products`, productsRouter)


    product.save().then((createdProduct=> {
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
         error: err,
         success: false   
        })
    })
    // res.send(newProduct); 



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
