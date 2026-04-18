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
    'https://www.maurion.co.uk',
    'http://localhost:5174'
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
app.use('/api/orders', require('./routes/order.js'));
// DB Connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error(err));

// Export for Vercel
const PORT = process.env.PORT;
app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT}`);
})

