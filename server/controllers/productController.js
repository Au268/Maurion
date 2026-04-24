const Product = require('../models/Product');
const { cloudinary } = require('../config/cloudinary');

// ── POST /api/products/add ────────────────────────────────────────────────────
const addProduct = async (req, res) => {
  try {
    const { title, price, category, description, stock } = req.body;

    const colors = req.body.colors
      ? Array.isArray(req.body.colors)
        ? req.body.colors
        : [req.body.colors]
      : [];

    // req.files is an array when using upload.array('images', 10)
    const images = (req.files || []).map((file) => ({
      url:      file.path,      // Cloudinary secure URL
      publicId: file.filename,  // Cloudinary public_id
    }));

    const newProduct = new Product({
      title,
      price,
      category,
      description,
      stock: Number(stock),
      color: colors,
      images,
    });

    const saved = await newProduct.save();
    return res.status(201).json({ message: 'Product added successfully', product: saved });
  } catch (error) {
    console.error('ADD PRODUCT ERROR:', error);
    return res.status(500).json({ message: error.message, stack: error.stack, name: error.name });
  }
};

// ── POST /api/products/edit/:id ───────────────────────────────────────────────
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, category, description, stock } = req.body;

    const colors = req.body.colors
      ? Array.isArray(req.body.colors)
        ? req.body.colors
        : [req.body.colors]
      : undefined;

    // Images the user wants to KEEP (sent as JSON string from frontend)
    const keepImages = req.body.keepImages
      ? JSON.parse(req.body.keepImages)
      : undefined;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Delete removed images from Cloudinary
    if (keepImages !== undefined) {
      const keepIds = keepImages.map((img) => img.publicId);
      const toDelete = product.images.filter((img) => !keepIds.includes(img.publicId));
      await Promise.all(toDelete.map((img) => cloudinary.uploader.destroy(img.publicId)));
    }

    // Merge kept images with any newly uploaded files
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        url:      file.path,
        publicId: file.filename,
      }));
      product.images = [...(keepImages ?? product.images), ...newImages];
    } else if (keepImages !== undefined) {
      product.images = keepImages;
    }

    if (title       !== undefined) product.title       = title;
    if (price       !== undefined) product.price       = price;
    if (category    !== undefined) product.category    = category;
    if (description !== undefined) product.description = description;
    if (stock       !== undefined) product.stock       = Number(stock);
    if (colors      !== undefined) product.color       = colors;

    await product.save();
    return res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('EDIT PRODUCT ERROR:', error);
    return res.status(500).json({ message: 'Server Error: Could not update product', error: error.message });
  }
};

// ── DELETE /api/products/:id ──────────────────────────────────────────────────
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Delete ALL images from Cloudinary
    await Promise.all(
      (product.images || []).map((img) => cloudinary.uploader.destroy(img.publicId))
    );

    await product.deleteOne();
    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE PRODUCT ERROR:', error);
    return res.status(500).json({ message: 'Server Error: Could not delete product', error: error.message });
  }
};

module.exports = { addProduct, deleteProduct, editProduct };