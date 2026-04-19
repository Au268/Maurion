const Order = require('../models/Order');
const { v4: uuidv4 } = require('uuid');

const saveOrder = async (req, res) => {
  try {
    const { shipping, items, subtotal, tax, total, paymentIntentId } = req.body;


    if (!shipping || !shipping.email || !items) {
      return res.status(400).json({ success: false, message: 'Missing required order data.' });
    }

    const order = await Order.create({
      order_id: uuidv4(),
      customer_id: shipping.email,
      shipping,
      items,
      subtotal,
      tax,
      total,
      status: 'paid',
      paymentIntentId,
    });

    res.status(201).json({ success: true, order_id: order.order_id });
  } catch (err) {
    console.error('Order save error:', err);
    res.status(500).json({ success: false, message: 'Failed to save order.' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ 
      success: true,
      orders: orders
    });
  } catch (err) { 
    console.error('Order get error:', err);
    res.status(500).json({ success: false, message: 'Failed to get orders.' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    // CHANGE: Use findOneAndUpdate instead of findByIdAndUpdate
    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: id }, // This is the filter/query object
      { status: status }, 
      { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Status updated successfully',
      order: updatedOrder 
    });
  } catch (err) {
    console.error('Order update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update order.' });
  }
};

module.exports = { saveOrder, getOrders,updateOrderStatus };