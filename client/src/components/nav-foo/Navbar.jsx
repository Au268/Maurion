import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { totalItems } = useCart();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tracksuits', path: '/category/tracksuits' },
    { name: 'Polo Shirts', path: '/category/polo-shirts' },
    { name: 'Jackets', path: '/category/jackets' },
    { name: 'T-Shirts', path: '/category/t-shirts' },
    { name: 'Perfumes', path: '/category/perfumes' },
    { name: 'Accessories', path: '/category/Accessories' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-zinc-100 px-6 py-5 md:px-12 transition-all duration-300">
        <div className="flex justify-between items-center w-full max-w-384 mx-auto">
          
          <div className="flex-1 flex justify-start">
            <Link to="/" className="shrink-0">
              <h1 className="text-2xl font-black tracking-tighter text-zinc-900 uppercase font-headline">
                MAURION
              </h1>
            </Link>
          </div>

          <div className="hidden lg:flex flex-2 justify-center items-center">
            <div className="flex gap-6 xl:gap-10 whitespace-nowrap">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.path} 
                  className={`font-['Epilogue'] uppercase text-[10px] xl:text-[11px] font-bold tracking-[0.2em] pb-1 transition-all
                    ${item.name === 'Home' ? 'text-zinc-950 border-b-2 border-zinc-950' : 'text-zinc-400 hover:text-zinc-950'}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
            <button className="hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px] md:text-[24px]">search</span>
            </button>
            <button className="hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[22px] md:text-[24px]">person</span>
            </button>

            {/* Cart button with badge */}
            <Link to="/cart" className="hover:scale-110 transition-transform relative">
            <span className="material-symbols-outlined text-[22px] md:text-[24px]">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-zinc-900 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
            </Link>
            
           <button 
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden flex items-center justify-center ml-2"
            >
              <span className="material-symbols-outlined text-[28px] text-zinc-900">menu</span>
            </button>
          </div>
        </div>
      </nav>

      <div 
        className={`fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${isDrawerOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div 
          className={`absolute right-0 top-0 h-full w-[80%] max-w-[320px] bg-white p-10 shadow-2xl transition-transform duration-500 ease-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-16">
            <h1 className="text-2xl font-black tracking-tighter text-zinc-900 uppercase">MAURION</h1>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2">
              <span className="material-symbols-outlined text-zinc-400">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.path} 
                onClick={() => setIsDrawerOpen(false)}
                className="text-sm font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;