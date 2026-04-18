import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';



const cardElementStyle = {
  style: {
    base: {
      fontSize: '14px',
      fontFamily: 'inherit',
      color: '#18181b',
      fontWeight: '500',
      '::placeholder': { color: '#a1a1aa' },
    },
    invalid: { color: '#ef4444' },
  },
};

const PaymentForm = ({ total, onSuccess }) => {
  const stripe   = useStripe();
  const elements = useElements();
  const [cardName, setCardName] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_BASE_URL}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });
      const { clientSecret } = await res.json();

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: cardName },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-5 max-w-lg">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Card Number</label>
          <div className="w-full border border-zinc-200 rounded-lg px-4 py-3.5 focus-within:border-zinc-900 transition-colors bg-white">
            <CardNumberElement options={cardElementStyle} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Name on Card</label>
          <input
            value={cardName}
            onChange={e => setCardName(e.target.value)}
            placeholder="John Doe"
            className="w-full border border-zinc-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-zinc-900 transition-colors bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Expiry</label>
            <div className="border border-zinc-200 rounded-lg px-4 py-3.5 focus-within:border-zinc-900 transition-colors bg-white">
              <CardExpiryElement options={cardElementStyle} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">CVV</label>
            <div className="border border-zinc-200 rounded-lg px-4 py-3.5 focus-within:border-zinc-900 transition-colors bg-white">
              <CardCvcElement options={cardElementStyle} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400 font-bold">
          <span className="material-symbols-outlined text-base text-green-500">lock</span>
          Secured by Stripe · Test card: 4242 4242 4242 4242
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-500 font-medium">
            {error}
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-10">
        <Link
          to="/checkout/shipping"
          className="px-8 py-4 border border-zinc-200 text-xs font-black uppercase tracking-widest text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-all rounded-lg"
        >
          Back
        </Link>
        <button
          onClick={handleSubmit}
          disabled={loading || !stripe}
          className="flex-1 md:flex-none md:px-14 py-4 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed transition-all rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </>
  );
};

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  useEffect(() => { scrollTo(0, 0); }, []);

  // Guard: if no shipping data, send back
  const shipping = JSON.parse(sessionStorage.getItem('shipping') || '{}');

  const tax   = totalPrice * 0.08;
  const total = totalPrice + tax;



// With this:
const handleSuccess = async (paymentIntentId) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        shipping,
        items: cart,
        subtotal: totalPrice,
        tax,
        total,
        paymentIntentId,
      }),
    });
  } catch (err) {
    console.error('Order save failed:', err);
  }

  clearCart();
  sessionStorage.removeItem('shipping');
  setPlaced(true);
};

  if (placed) {
    return (
      <main className="pt-32 pb-20 min-h-screen flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-white text-4xl">check</span>
          </div>
          <h1 className="font-headline text-5xl font-black tracking-tighter text-zinc-900 uppercase mb-4">
            Order Placed!
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed mb-10">
            Thank you! Confirmation sent to{' '}
            <span className="text-zinc-900 font-bold">{shipping.email}</span>.
          </p>
          <Link to="/" className="px-10 py-4 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="pt-32 pb-20 min-h-screen flex items-center justify-center px-8">
        <div className="text-center">
          <p className="text-neutral-400 mb-6">Your cart is empty.</p>
          <Link to="/" className="px-10 py-4 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest">Shop Now</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 min-h-screen max-w-screen-xl mx-auto px-8">

      {/* Progress */}
      <div className="flex items-center gap-3 mb-16">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-black flex items-center justify-center">
            <span className="material-symbols-outlined text-sm">check</span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-zinc-900">Shipping</span>
        </div>
        <div className="flex-1 h-px bg-zinc-900" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-black flex items-center justify-center">2</div>
          <span className="text-xs font-black uppercase tracking-widest text-zinc-900">Payment</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">

        <div className="flex-1">
          <h2 className="font-headline text-3xl font-black tracking-tighter uppercase text-zinc-900 mb-8">
            Payment
          </h2>
          <Elements stripe={stripePromise}>
            <PaymentForm total={total} onSuccess={handleSuccess} />
          </Elements>
        </div>

        {/* Summary */}
        <aside className="lg:w-80 shrink-0">
          <div className="bg-zinc-50 rounded-2xl p-8 sticky top-32">

            {/* Shipping summary */}
            {shipping.firstName && (
              <div className="mb-6 pb-6 border-b border-zinc-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Ship To</h4>
                  <Link to="/checkout/shipping" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 underline">Edit</Link>
                </div>
                <p className="text-sm font-bold text-zinc-900">{shipping.firstName} {shipping.lastName}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{shipping.address}, {shipping.city}</p>
                <p className="text-xs text-zinc-400">{shipping.email}</p>
              </div>
            )}

            <h3 className="font-headline font-black text-sm uppercase tracking-widest text-zinc-900 mb-6">Order Summary</h3>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex justify-between text-sm">
                  <span className="text-zinc-500 font-medium truncate max-w-[160px]">
                    {item.title} <span className="text-zinc-400">×{item.quantity}</span>
                  </span>
                  <span className="font-black text-zinc-900 shrink-0">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-200 pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400 font-medium">Subtotal</span>
                <span className="font-black text-zinc-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 font-medium">Shipping</span>
                <span className="font-black text-green-500">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 font-medium">Tax (8%)</span>
                <span className="font-black text-zinc-900">${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-zinc-200 mt-4 pt-4 flex justify-between items-baseline">
              <span className="font-headline font-black uppercase tracking-tight text-zinc-900">Total</span>
              <span className="font-headline font-black text-2xl text-zinc-900">${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
};

export default Payment;