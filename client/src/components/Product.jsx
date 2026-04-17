import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import getProducts from '../apis/getProducts';
import { useCart } from '../context/CartContext';

const mockColors = [
  { name: 'Black',  hex: 'bg-black' },
  { name: 'White',  hex: 'bg-white border border-neutral-300' },
  { name: 'Navy',   hex: 'bg-blue-900' },
  { name: 'Grey',   hex: 'bg-neutral-400' },
  { name: 'Beige',  hex: 'bg-amber-100 border border-neutral-300' },
  { name: 'Brown',  hex: 'bg-amber-800' },
  { name: 'Blue',   hex: 'bg-blue-500' },
  { name: 'Pink',   hex: 'bg-pink-400' },
  { name: 'Red',    hex: 'bg-red-500' },
  { name: 'Green',  hex: 'bg-green-500' },
  { name: 'Yellow', hex: 'bg-yellow-400' },
];

const mockSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();
  
  const [added, setAdded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const fetchProduct = async () => {
      const products = await getProducts();
      const list = Array.isArray(products)
        ? products
        : products?.products ?? products?.data ?? [];

      // Match by _id (MongoDB) or id
      const found = list.find(p => p._id === id || p.id === id) || list[0];
      setProduct(found);
      setSelectedColor('Black');
      setSelectedSize(found?.sizes?.[0] || '');
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center text-neutral-400 animate-pulse">
        Loading product…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center text-neutral-500">
        Product not found.
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const imageUrl = product.imageUrl || product.image || '';
  const productId = product._id || product.id || '';
  const colors = Array.isArray(product.color) ? product.color : product.color ? [product.color] : [];
  const sizes  = product.sizes?.length  ? product.sizes  : [];

  return (
    <main className="pt-32 pb-20 max-w-screen-2xl mx-auto px-8">
      <Link
        to={`/category/${product.category}`}
        className="text-sm font-label text-secondary hover:text-primary mb-8 inline-flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to {product.category?.replace('-', ' ')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* ── Left: Images ───────────────────────────────────────────────── */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="col-span-2 aspect-[4/3] bg-secondary-container overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-cover"
              alt={product.title}
              src={imageUrl}
            />
          </div>
          <div className="aspect-square bg-secondary-container overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-cover grayscale"
              alt="Detail 1"
              src={imageUrl}
            />
          </div>
          <div className="aspect-square bg-secondary-container overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-cover grayscale contrast-125"
              alt="Detail 2"
              src={imageUrl}
            />
          </div>
        </div>

        {/* ── Right: Details ─────────────────────────────────────────────── */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <section>
            <span className="text-secondary font-label uppercase tracking-widest text-xs mb-2 block">
              Maurion Archive {String(productId).slice(-2).padStart(2, '0')}
            </span>
            <h1 className="font-headline text-5xl font-bold tracking-tighter text-on-surface leading-tight">
              {product.title}
            </h1>
            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-2xl font-medium font-body">${Number(product.price).toFixed(2)}</span>
              <span className="text-outline-variant line-through text-sm">
                ${(Number(product.price) * 1.25).toFixed(2)}
              </span>
            </div>
            <p className="mt-6 text-on-surface-variant font-body leading-relaxed max-w-md">
              {product.description}
            </p>
          </section>

          {/* Color Selection */}
          {colors.length > 0 && (
            <section>
              <h3 className="font-label text-sm uppercase tracking-wider mb-4">
                Color &mdash; <span className="text-on-surface font-semibold">{selectedColor}</span>
              </h3>
              <div className="flex flex-row flex-wrap gap-6 mt-2">
                {colors.map(colorName => {
                  const cData = mockColors.find(c => c.name === colorName) || { hex: 'bg-black' };
                  const isSelected = selectedColor === colorName;
                  return (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName)}
                      className="flex flex-col items-center gap-2"
                    >
                      <span className={`w-10 h-10 rounded-full ${cData.hex} hover:scale-105 transition-transform ${
                        isSelected ? 'ring-2 ring-offset-2 ring-primary' : 'ring-1 ring-neutral-300'
                      }`} />
                      <span className={`text-xs font-bold uppercase tracking-tight ${
                        isSelected ? 'text-neutral-900' : 'text-neutral-400'
                      }`}>
                        {colorName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Size Selection */}
          {sizes.length > 0 && (
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-label text-sm uppercase tracking-wider">Size</h3>
                <button className="text-xs underline text-secondary hover:text-primary transition-colors">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {mockSizes.map(size => {
                  const isAvailable = sizes.includes(size);
                  const isSelected  = selectedSize === size;
                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm font-medium transition-all ${
                        !isAvailable
                          ? 'opacity-30 cursor-not-allowed border border-outline-variant/30 text-on-surface'
                          : isSelected
                          ? 'bg-primary text-on-primary'
                          : 'border border-outline-variant/30 hover:bg-primary hover:text-on-primary text-on-surface'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Quantity & Actions */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-surface-container-low rounded-lg p-1">
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-highest rounded transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <span className="material-symbols-outlined scale-75">remove</span>
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-highest rounded transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <span className="material-symbols-outlined scale-75">add</span>
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="grow bg-primary text-on-primary py-4 font-label uppercase tracking-widest text-sm hover:opacity-90 active:scale-[0.98] transition-all"
              >
                {added ? '✓ Added!' : 'Add to Bag'}
              </button>
            </div>
            <button className="w-full bg-surface-container-highest text-on-surface py-4 font-label uppercase tracking-widest text-sm hover:bg-surface-variant transition-colors">
              Proceed to Checkout
            </button>
          </section>

          {/* Order Summary */}
          <section className="bg-surface-container-low p-8 rounded-lg mt-4">
            <h3 className="font-label text-sm uppercase tracking-wider mb-6">Order Summary</h3>
            <div className="space-y-4 font-body text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-semibold">${(Number(product.price) * quantity).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Shipping</span>
                <span className="text-secondary">Free</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-outline-variant/10">
                <span className="font-bold">Total (USD)</span>
                <span className="font-bold text-lg">${(Number(product.price) * quantity).toFixed(2)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Product;