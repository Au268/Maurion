const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');
const { v4: uuidv4 } = require('uuid'); // npm i uuid

router.post('/', async (req, res) => {
  try {
    const { shipping, items, subtotal, tax, total, paymentIntentId } = req.body;

    const order = await Order.create({
      order_id:        uuidv4(),
      customer_id:     shipping.email,   // use email as customer identifier
      shipping,
      items,
      subtotal,
      tax,
      total,
      status:          'paid',
      paymentIntentId,
    });

    res.status(201).json({ success: true, order_id: order.order_id });
  } catch (err) {
    console.error('Order save error:', err);
    res.status(500).json({ success: false, message: 'Failed to save order.' });
  }
});

module.exports = router;