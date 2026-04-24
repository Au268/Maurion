const express = require('express');
const router = express.Router();
const { addProduct, deleteProduct, editProduct } = require('../controllers/productController');
const { getAllProducts, getProductById } = require('../controllers/getProducts');
const { upload } = require('../config/cloudinary');

router.get('/get', getAllProducts);
router.post('/getById', getProductById);

// upload.array('images', 10) — field name 'images', max 10 files
router.post('/add',      upload.array('images', 10), addProduct);
router.post('/edit/:id', upload.array('images', 10), editProduct);
router.delete('/:id', deleteProduct);

module.exports = router;