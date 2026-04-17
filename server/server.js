require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
// Import Routes
const productRoutes = require('./routes/productRoutes.js');

// DB connection
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(err));

// const addProduct = require("./controllers/productController").addProduct();

// API Routes
app.use('/api/products', productRoutes);

const paymentRoutes = require('./routes/Paymentroutes.js');
app.use('/api/payment', paymentRoutes);
module.exports = app;