const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id:       { type: String, required: true, unique: true },
  customer_id:    { type: String, required: true },
  shipping: {
    firstName: String,
    lastName:  String,
    address:   String,
    city:      String,
    email:     String,
  },
  items: [
    {
      id:       String,
      title:    String,
      price:    Number,
      quantity: Number,
      color:    String,
      size:     String,
      image:    String,
    }
  ],
  subtotal:        { type: Number, required: true },
  tax:             { type: Number, required: true },
  total:           { type: Number, required: true },
  status:          { type: String, default: 'paid' },
  paymentIntentId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);