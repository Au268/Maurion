import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Shipping = () => {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();

  useEffect(() => { scrollTo(0, 0); }, []);

  const [shipping, setShipping] = useState(() => {
    const saved = sessionStorage.getItem('shipping');
    return saved ? JSON.parse(saved) : {
      firstName: '', lastName: '', email: '',
      phone: '', address: '', city: '',
      county: '', postcode: '', country: 'United Kingdom',
    };
  });

  const tax = totalPrice * 0.08;
  const total = totalPrice + tax;

  const handleChange = e => setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handleContinue = () => {
    sessionStorage.setItem('shipping', JSON.stringify(shipping));
    navigate('/checkout/payment');
  };

  if (cart.length === 0) {
    return (
      <main className="pt-32 pb-20 min-h-screen flex items-center justify-center px-8">
        <div className="text-center">
          <p className="text-neutral-400 mb-6">Your cart is empty.</p>
          <Link to="/" className="px-10 py-4 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest">
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 min-h-screen max-w-screen-xl mx-auto px-8">

      {/* Progress */}
      <div className="flex items-center gap-3 mb-16">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-black flex items-center justify-center">1</div>
          <span className="text-xs font-black uppercase tracking-widest text-zinc-900">Shipping</span>
        </div>
        <div className="flex-1 h-px bg-zinc-200" />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-400 text-xs font-black flex items-center justify-center">2</div>
          <span className="text-xs font-black uppercase tracking-widest text-zinc-300">Payment</span>
        </div>
      </div>

      

        {/* Form */}
        <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <h2 className="font-headline text-3xl font-black tracking-tighter uppercase text-zinc-900 mb-8">
            Shipping Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { name: 'firstName', label: 'First Name', col: 1 },
              { name: 'lastName',  label: 'Last Name',  col: 1 },
              { name: 'email',     label: 'Email',      col: 2 },
              { name: 'phone',     label: 'Phone',      col: 2 },
              { name: 'address',   label: 'Address',    col: 2 },
              { name: 'city',      label: 'City',       col: 1 },
              { name: 'county',    label: 'County',     col: 1 }, // Updated
              { name: 'postcode',  label: 'Postcode',   col: 1 }, // Updated
              { name: 'country',   label: 'Country',    col: 1 }, // Updated
            ].map(f => (
              <div key={f.name} className={f.col === 2 ? 'md:col-span-2' : ''}>
                <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">{f.label}</label>
                <input
                  name={f.name}
                  value={shipping[f.name]}
                  onChange={handleChange}
                  placeholder={f.label}
                  className="w-full border border-zinc-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-zinc-900 transition-colors bg-white"
                />
              </div>
            ))}
            </div>
          <div className="flex gap-4 mt-10">
            <Link
              to="/cart"
              className="px-8 py-4 border border-zinc-200 text-xs font-black uppercase tracking-widest text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-all rounded-lg"
            >
              Back to Cart
            </Link>
            <button
              onClick={handleContinue}
              disabled={!shipping.firstName || !shipping.email || !shipping.address}
              className="flex-1 md:flex-none md:px-14 py-4 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-lg"
            >
              Continue to Payment
            </button>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:w-80 shrink-0">
          <div className="bg-zinc-50 rounded-2xl p-8 sticky top-32">
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

export default Shipping;