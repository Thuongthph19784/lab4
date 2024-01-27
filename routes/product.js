var express = require('express');
var router = express.Router();
const Product = require('../components/controller/ProductController');

/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        Product.getProducts(req, res);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router; // Export the router