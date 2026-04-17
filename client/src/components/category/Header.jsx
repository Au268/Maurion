import React from 'react'

const Header = ({displayCategory,filteredProducts}) => {
  return (
    <header className="px-8 md:px-16 mb-16 max-w-[1920px] mx-auto pt-32 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="font-headline text-6xl md:text-8xl font-black tracking-tighter text-neutral-800 uppercase leading-none">
              {displayCategory}
            </h1>
            <p className="mt-6 text-on-surface-variant max-w-xl text-lg leading-relaxed">
              Curated items tailored for the modern minimalist, exploring architectural form and timeless esthetics.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full">
              <span className="text-sm font-semibold text-on-surface">{filteredProducts.length} Items</span>
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header