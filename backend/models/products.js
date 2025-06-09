const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    image: String, 
    countInStock: {
        type : Number,
        required: true  // to make a data type required
    }
})

exports.Product = mongoose.model('Product', productSchema);