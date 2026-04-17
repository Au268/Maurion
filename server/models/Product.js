const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title:          { type: String, required: true },
  category:       { type: String, required: true },
  description:    { type: String, required: true },
  color:          [String],
  price:          String,
  image:          String,   
  imagePublicId:  String,   
});

module.exports = mongoose.model('Product', productSchema);