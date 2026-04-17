const express = require('express');
const router = express.Router();
const {addProduct, deleteProduct } = require('../controllers/productController');
const {getAllProducts,getProductById} = require("../controllers/getProducts");
const { upload } = require('../config/cloudinary');

// GET /api/products/get
router.get('/get', getAllProducts);

router.post("/getById",getProductById);

// POST /api/products/add  →  multipart/form-data with image file
router.post('/add', upload.single('image'), addProduct);

// DELETE /api/products/:id
router.delete('/:id', deleteProduct);

module.exports = router;