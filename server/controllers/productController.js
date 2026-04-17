const Product = require('../models/Product');
const { cloudinary } = require('../config/cloudinary');

// ── GET all products ──────────────────────────────────────────────────────────
const addProduct = async (req, res) => {
  try {
    const { title, price, category, color, description } = req.body;

    const newProduct = new Product({
      title,
      price,
      category,
      color,
      description,
      image:         req.file?.path     ?? '',   // Cloudinary secure URL
      imagePublicId: req.file?.filename ?? '',   // Cloudinary public_id
    });

    const saved = await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: saved });
  } catch (error) {
  console.error('ADD PRODUCT ERROR:', error);
  return res.status(500).json({ 
    message: error.message,
    stack: error.stack,
    name: error.name
  });
}
};


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not delete product', error: error.message });
  }
};

module.exports = { addProduct, deleteProduct };