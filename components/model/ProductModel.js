const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
