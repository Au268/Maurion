import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  if (cart.length === 0) {
    return (
      <main className="pt-32 pb-20 min-h-screen max-w-screen-xl mx-auto px-8">
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <span className="material-symbols-outlined text-6xl text-neutral-200">shopping_bag</span>
          <h1 className="font-headline text-4xl font-black tracking-tighter text-neutral-800 uppercase">
            Your Bag is Empty
          </h1>
          <p className="text-neutral-400 text-sm tracking-wide">
            Looks like you haven't added anything yet.
          </p>
          <Link
            to="/"
            className="mt-4 px-10 py-4 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 min-h-screen max-w-screen-xl mx-auto px-8">
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 uppercase leading-none">
            Your Bag
          </h1>
          <p className="mt-3 text-neutral-400 text-sm tracking-widest uppercase">
            {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
          </p>
        </div>
        <Link
          to="/"
          className="hidden md:inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-zinc-900 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Continue Shopping
        </Link>
      </header>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1 flex flex-col divide-y divide-zinc-100">
          {cart.map((item, index) => (
            <div
              key={`${item.id}-${item.color}-${item.size}`}
              className="flex gap-6 py-8 group"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Link to={`/product/${item.id}`} className="shrink-0">
                <div className="w-12 h-14 md:w-16 md:h-20 bg-zinc-100 overflow-hidden rounded-md">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-zinc-300 text-3xl">image</span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h2 className="font-headline font-black text-base md:text-lg uppercase tracking-tight text-zinc-900 hover:opacity-60 transition-opacity">
                        {item.title}
                      </h2>
                    </Link>
                    <div className="flex gap-4 mt-1.5">
                      {item.color && (
                        <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold">
                          {item.color}
                        </span>
                      )}
                      {item.size && (
                        <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold">
                          Size: {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-black text-base text-zinc-900">
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-zinc-200 rounded-full overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.color, item.size, -1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-500"
                    >
                      <span className="material-symbols-outlined text-base">remove</span>
                    </button>
                    <span className="w-10 text-center text-sm font-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.color, item.size, +1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 transition-colors text-zinc-500"
                    >
                      <span className="material-symbols-outlined text-base">add</span>
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.color, item.size)}
                    className="text-xs uppercase tracking-widest font-bold text-neutral-300 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:w-80 shrink-0">
          <div className="bg-zinc-50 rounded-2xl p-8 sticky top-32">
            <h3 className="font-headline font-black text-sm uppercase tracking-widest text-zinc-900 mb-8">
              Order Summary
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium">Subtotal</span>
                <span className="font-black text-zinc-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium">Shipping</span>
                <span className="font-black text-green-500">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium">Tax</span>
                <span className="font-black text-zinc-900">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-zinc-200 mt-6 pt-6 flex justify-between items-baseline">
              <span className="font-headline font-black uppercase tracking-tight text-zinc-900">Total</span>
              <span className="font-headline font-black text-2xl text-zinc-900">
                ${(totalPrice * 1.08).toFixed(2)}
              </span>
            </div>
            <Link to="/checkout/shipping">
              <button className="mt-8 w-full bg-zinc-900 text-white py-4 text-xs font-black uppercase tracking-widest hover:opacity-80 active:scale-[0.98] transition-all rounded-lg">
                Proceed to Checkout
              </button>
            </Link>
            <Link
              to="/"
              className="mt-4 w-full flex justify-center text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-zinc-900 transition-colors py-3"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Cart;