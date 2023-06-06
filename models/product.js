// require mongoose
const mongoose = require('mongoose')

// create schema
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    profile_img: String,
    cloudinary_id: String
})

//export
module.exports = Connect = mongoose.model('product', productSchema)