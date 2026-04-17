// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');


// const app = express();
// app.use(cors({
//   origin: 'https://maurion-gzav.vercel.app', // your frontend URL
//   credentials: true
// }));
// app.use(express.json());
// // Import Routes
// const productRoutes = require('./routes/productRoutes.js');

// // DB connection
// const MONGODB_URI = process.env.MONGODB_URI;
// console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
// console.log('STRIPE exists:', !!process.env.STRIPE_SECRET_KEY);

// mongoose.connect(MONGODB_URI)
//   .then(() => console.log('MongoDB connected!'))
//   .catch(err => console.error(err));

// // const addProduct = require("./controllers/productController").addProduct();

// // API Routes
// app.use('/api/products', productRoutes);

// const paymentRoutes = require('./routes/Paymentroutes.js');
// app.use('/api/payment', paymentRoutes);
// module.exports = app;


require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://maurion.vercel.app',
    'https://maurion-gzav.vercel.app',
    'http://localhost:5173',
    'https://www.maurion.co.uk'
  ],
  credentials: true
}));
app.use(express.json());

// ✅ Root route
app.get('/', (req, res) => {
  res.json({ status: 'Server is running ✅' });
});

// Import Routes
const productRoutes = require('./routes/productRoutes.js');
const paymentRoutes = require('./routes/Paymentroutes.js');

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);

// DB Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(err));

// Export for Vercel
module.exports = app;