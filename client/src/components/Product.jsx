import React, { useState, useEffect, useCallback } from 'react';
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

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ images, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-5 text-white/50 text-[12px] font-bold tracking-widest uppercase">
        {activeIndex + 1} / {images.length}
      </span>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
      )}

      {/* Image */}
      <div
        className="max-w-4xl max-h-[85vh] w-full px-16 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[activeIndex]}
          alt={`Product image ${activeIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          style={{ transition: 'opacity 0.2s' }}
        />
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 w-11 h-11 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2" onClick={(e) => e.stopPropagation()}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => {/* handled via onPrev/onNext from parent */}}
              className={`w-12 h-12 rounded overflow-hidden border-2 transition-all ${
                i === activeIndex ? 'border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-70'
              }`}
            >
              <img src={img} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Product Page ─────────────────────────────────────────────────────────
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const fetchProduct = async () => {
      const products = await getProducts();
      const list = Array.isArray(products)
        ? products
        : products?.products ?? products?.data ?? [];
      const found = list.find(p => p._id === id || p.id === id) || list[0];
      setProduct(found);
      setSelectedColor('Black');
      setSelectedSize(found?.sizes?.[0] || '');
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  // Build image array from new multi-image schema with fallbacks
  const images = React.useMemo(() => {
    if (!product) return [];
    if (product.images?.length > 0) return product.images.map(img => img.url);
    if (product.imageUrl) return [product.imageUrl];
    if (product.image) return [product.image];
    return [];
  }, [product]);

  const goPrev = useCallback(() => setActiveImg(i => (i - 1 + images.length) % images.length), [images.length]);
  const goNext = useCallback(() => setActiveImg(i => (i + 1) % images.length), [images.length]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="pt-32 pb-20 text-center text-neutral-400 animate-pulse">Loading product…</div>;
  if (!product) return <div className="pt-32 pb-20 text-center text-neutral-500">Product not found.</div>;

  const productId = product._id || product.id || '';
  const colors = Array.isArray(product.color) ? product.color : product.color ? [product.color] : [];
  const sizes = product.sizes?.length ? product.sizes : [];

  return (
    <main className="pt-32 pb-20 max-w-screen-2xl mx-auto px-8">

      {/* Lightbox */}
      {lightboxOpen && images.length > 0 && (
        <Lightbox
          images={images}
          activeIndex={activeImg}
          onClose={() => setLightboxOpen(false)}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}

      <Link
        to={`/category/${product.category}`}
        className="text-sm font-label text-secondary hover:text-primary mb-8 inline-flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Back to {product.category?.replace('-', ' ')}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* ── Left: Image slider ─────────────────────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col gap-4">

          {/* Main image */}
          <div
            className="relative aspect-[4/3] bg-secondary-container overflow-hidden rounded-lg cursor-zoom-in group"
            onClick={() => images.length > 0 && setLightboxOpen(true)}
          >
            {images.length > 0
              ? (
                <img
                  key={activeImg}
                  src={images[activeImg]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              )
              : <span className="material-symbols-outlined text-[48px] text-neutral-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">image</span>
            }

            {/* Zoom hint */}
            <div className="absolute top-3 right-3 bg-black/40 text-white rounded-full px-2.5 py-1 text-[11px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-[14px]">zoom_in</span>
              Zoom
            </div>

            {/* Prev / Next arrows on main image */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </>
            )}

            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                    className={`rounded-full transition-all ${
                      i === activeImg ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                    i === activeImg
                      ? 'border-neutral-900 opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
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
                    <button key={colorName} onClick={() => setSelectedColor(colorName)} className="flex flex-col items-center gap-2">
                      <span className={`w-10 h-10 rounded-full ${cData.hex} hover:scale-105 transition-transform ${
                        isSelected ? 'ring-2 ring-offset-2 ring-primary' : 'ring-1 ring-neutral-300'
                      }`} />
                      <span className={`text-xs font-bold uppercase tracking-tight ${isSelected ? 'text-neutral-900' : 'text-neutral-400'}`}>
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
                  const isSelected = selectedSize === size;
                  return (
                    <button key={size} disabled={!isAvailable} onClick={() => setSelectedSize(size)}
                      className={`py-3 text-sm font-medium transition-all ${
                        !isAvailable ? 'opacity-30 cursor-not-allowed border border-outline-variant/30 text-on-surface'
                        : isSelected ? 'bg-primary text-on-primary'
                        : 'border border-outline-variant/30 hover:bg-primary hover:text-on-primary text-on-surface'
                      }`}>
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
                <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-highest rounded transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <span className="material-symbols-outlined scale-75">remove</span>
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-highest rounded transition-colors"
                  onClick={() => setQuantity(quantity + 1)}>
                  <span className="material-symbols-outlined scale-75">add</span>
                </button>
              </div>
              <button onClick={handleAddToCart}
                className="grow bg-primary text-on-primary py-4 font-label uppercase tracking-widest text-sm hover:opacity-90 active:scale-[0.98] transition-all">
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