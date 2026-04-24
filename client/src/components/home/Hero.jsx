import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import ShopPage from './ShopCollection';

const Hero = () => {
  return (
    
    <header className="relative h-dvh w-full overflow-hidden flex flex-col items-center justify-center bg-[#c6cfce]">
      
     <div className="relative z-0 flex items-center justify-center w-full px-4 mt-8 md:mt-12 mb-16 md:mb-20"> 
        <img 
          src={logo} 
          alt="Maurion Logo" 
          className="w-full md:w-[75%] max-w-5xl h-auto object-contain transition-all duration-500"
        />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-24 md:pb-32 px-4 w-full">
        <div className="flex flex-col items-center w-full">
          <Link 
            to="/collections" 
            className="bg-zinc-950 text-white 
                       w-full sm:w-auto px-14 py-4 text-[12px] 
                       md:px-24 md:py-5 md:text-sm 
                       font-bold uppercase tracking-[0.4em] text-center
                       transition-all duration-300 ease-in-out
                       hover:bg-zinc-800 hover:scale-105 active:scale-95 
                       shadow-2xl"
          >
            Shop Collection
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10 opacity-30">
        <span className="material-symbols-outlined text-zinc-900 font-extralight text-2xl md:text-4xl">
          keyboard_double_arrow_down
        </span>
      </div>
    </header>
  );
};

export default Hero;