const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// POST /api/payment/create-payment-intent
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // amount in cents e.g. 2999 = $29.99

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert dollars to cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;