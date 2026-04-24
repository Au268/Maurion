import React from 'react';
import { Link } from 'react-router-dom';

const Main = ({ sizes, colors, toggleSize, toggleColor, filteredProducts, sortOption, setSortOption, selectedSizes, selectedColors, allProducts, status }) => {
  return (
    <main>
      <section className="px-8 md:px-16 max-w-480 mx-auto">
        {/* Container: Mobile pe column, Large screen pe row */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* ── 1. PRODUCT GRID (Mobile pe upar dikhega) ── */}
          <div className="flex-1 order-1 lg:order-2">
            {allProducts.length === 0 ? (
              <div className="py-20 text-center text-neutral-400 font-label animate-pulse">
                Loading products…
              </div>
            ) : allProducts.length === 0 && status === "Failure" ? (
              <div className="py-20 text-center text-neutral-400 font-label">
                No products found
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-neutral-500 font-label">
                No products match the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/product/${product._id || product.id}`}
                    key={product._id || product.id}
                    className="group cursor-pointer"
                  >
                      <div className="aspect-3/4 bg-secondary-container overflow-hidden mb-6 relative">
                      {(() => {
                        const firstImage =
                          product.images?.[0]?.url || product.imageUrl || product.image || null;
                        const imageCount = product.images?.length ?? (product.image || product.imageUrl ? 1 : 0);
                        return (
                          <>
                            {firstImage
                              ? <img
                                  alt={product.imageAlt || product.title}
                                  src={firstImage}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                              : <span className="material-symbols-outlined text-[40px] text-[#CCCCCC] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">image</span>
                            }
                            {imageCount > 1 && (
                              <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                                +{imageCount}
                              </span>
                            )}
                          </>
                        );
                      })()}

                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-surface-container-lowest p-3 rounded-full shadow-xl flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary">add</span>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-start">
                        <h2 className="font-headline font-bold text-lg tracking-tight uppercase">{product.title}</h2>
                        <span className="font-bold text-sm">${product.price}</span>
                      </div>
                      <p className="text-on-surface-variant text-sm font-medium tracking-wide">
                        {product.features?.[0] || 'Premium Quality'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Load More */}
            {filteredProducts.length > 5 && (
              <div className="mt-24 flex justify-center">
                <button className="px-12 py-4 bg-primary text-on-primary font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-opacity">
                  Load More
                </button>
              </div>
            )}
          </div>

          {/* ── 2. FILTER SIDEBAR (Mobile pe niche chala jayega) ── */}
          <aside className="w-full lg:w-64 space-y-12 shrink-0 order-2 lg:order-1">
            
            {/* Size Filter */}
            <div className="space-y-6">
              <h3 className="font-headline font-bold text-sm tracking-widest uppercase text-on-surface">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => {
                  const isActive = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition-colors ${
                        isActive
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-6">
              <h3 className="font-headline font-bold text-sm tracking-widest uppercase text-on-surface">Color</h3>
              <div className="grid grid-cols-2 gap-4">
                {colors.map(color => {
                  const isActive = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className="flex items-center gap-3 group"
                    >
                      <span className={`w-5 h-5 rounded-full ${color.hex} ring-offset-2 ${isActive ? 'ring-2 ring-primary' : 'ring-1 ring-neutral-300'}`}></span>
                      <span className={`text-xs font-bold uppercase tracking-tight transition-colors ${isActive ? 'text-neutral-900' : 'text-neutral-600 group-hover:text-neutral-900'}`}>
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="space-y-6 pt-6">
              <h3 className="font-headline font-bold text-sm tracking-widest uppercase text-on-surface border-t border-outline-variant/15 pt-6">
                Sort By
              </h3>
              <div className="space-y-4">
                {['New Arrivals', 'Price Low to High', 'Price High to Low'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSortOption(opt)}
                    className={`block text-xs font-bold uppercase tracking-tighter transition-colors ${
                      sortOption === opt
                        ? 'text-primary underline decoration-2 underline-offset-4'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
};

export default Main;