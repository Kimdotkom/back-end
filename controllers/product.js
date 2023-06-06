// require schema
const Product = require('../models/product')
const cloudinary = require("../middleware/cloudinary");

// test route
exports.test =  async (req, res) => {
    try {
        res.send('Hello ! test test')
    } catch (error) {
        console.log(error)
    }
}

// add product
exports.addProduct =  async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        let product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            profile_img: result.secure_url,
            cloudinary_id: result.public_id,
          });

        await product.save()
        res.status(200).send({ success : [{msg: 'Product added successfully'}], product})
    } catch (error) {
        res.status(400).send({ errors : [{msg: 'error in adding new product'}], error})
    }
}

// get all products
exports.getProducts = async (req, res) => {
    try {
        const Products = await Product.find()
        res.status(200).send(Products)
    } catch (error) {
        res.status(400).send({errors: [{msg: 'error with getting products'}], error})
    }
}

// get product by id
exports.getProductById = async (req, res) => {
    try {
        const {_id} = req.params
        const product = await Product.findById({_id})
        if (!product) {
            res.status(400).send({errors: [{msg: 'Product not found'}], error})
        }
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send({errors: [{msg: 'error with getting product by id'}], error})
    }
}

// delete product
exports.deleteProduct = async (req, res) => {
    try {
        const {_id} = req.params
        await Product.findByIdAndDelete({_id})
        res.status(200).send({success: [{msg: 'Product deleted successfully'}]})
    } catch (error) {
        res.status(400).send({errors: [{msg: 'Cannot delete this product'}], error})
    }
}

// edit product
exports.editProduct = async (req, res) => {
    try {
        const {_id} = req.params
        const newProduct = req.body
        await Product.updateOne({_id}, {$set: newProduct})
        res.status(200).send({success: [{msg: 'Product updated successfully !'}], newProduct})
    } catch (error) {
        res.status(400).send({errors: [{msg: 'Cannot edit this product'}], error})
    }
}