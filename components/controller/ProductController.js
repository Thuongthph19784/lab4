
const Product = require('../model/ProductModel');
const createProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createProduct,
    getProducts
}
