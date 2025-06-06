const express = require('express')
const app = express();
const bodyParser = require('body-parser');

//middleware
app.use(bodyParser.json());
require('dotenv/config');

const api = process.env.API_URL;
// /api/v1
// app.get(api+'/products', (req, res) =>{
//     res.send('hello Api!'); //exchanging string data with front end
// })

//exchaning backend data to front end from get method
app.get(`${api}/products`, (req, res) =>{
    const products = {
        id: 1,
        name: "hair dresser",
        image: "some_url"
    }
    res.send(products); 
})
// exchaning front end data with backend
app.post(`${api}/products`, (req, res) =>{
    const newProduct = req.body;
    console.log(newProduct);
    res.send(newProduct); 
})

app.listen(3000, ()=>{
    console.log(api);
    console.log('server is running http://localhost:3000')
})
