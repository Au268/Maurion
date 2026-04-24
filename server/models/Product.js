const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  category:    { type: String, required: true },
  description: { type: String, required: true },
  color:       [String],
  price:       String,
  stock:       Number,

  // Multiple images — each entry has a URL and its Cloudinary public_id
  images: [
    {
      url:       { type: String, required: true },
      publicId:  { type: String, required: true },
    }
  ],
});

module.exports = mongoose.model('Product', productSchema);