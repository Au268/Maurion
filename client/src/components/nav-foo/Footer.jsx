import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-20 px-12 bg-zinc-50 border-t border-zinc-100 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
        <div className="col-span-1">
          <span className="text-lg font-bold text-zinc-900 uppercase font-headline">MAURION</span>
          <p className="mt-6 text-zinc-400 font-label text-xs tracking-widest leading-relaxed">
              A SYMBOL OF RESTRAINT AND REFINED UTILITY IN THE MODERN AGE.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-label text-xs tracking-widest uppercase font-bold text-zinc-900 mb-2">Shop</span>
          <a className="font-['Manrope'] text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-all hover:underline decoration-1 underline-offset-4" href="#">Summer Essentials</a>
          <a className="font-['Manrope'] text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-all hover:underline decoration-1 underline-offset-4" href="#">Portable Fridges</a>
          <a className="font-['Manrope'] text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-all hover:underline decoration-1 underline-offset-4" href="#">Laptop Stands</a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-label text-xs tracking-widest uppercase font-bold text-zinc-900 mb-2">Company</span>
          <a className="font-['Manrope'] text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-all hover:underline decoration-1 underline-offset-4" href="#">Sustainability</a>
          <a className="font-['Manrope'] text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-all hover:underline decoration-1 underline-offset-4" href="#">Privacy</a>
          <a className="font-['Manrope'] text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-all hover:underline decoration-1 underline-offset-4" href="#">Terms</a>
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-label text-xs tracking-widest uppercase font-bold text-zinc-900 mb-2">Newsletter</span>
          <div className="flex items-center border-b border-zinc-300 py-2">
            <input className="bg-transparent border-none focus:ring-0 text-xs font-label uppercase tracking-widest w-full" placeholder="Email Address" type="email"/>
            <button className="text-zinc-900">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-['Manrope'] text-[10px] tracking-widest uppercase text-zinc-400">© 2024 MAURION. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-8">
          <span className="font-['Manrope'] text-[10px] tracking-widest uppercase text-zinc-400 cursor-pointer hover:text-zinc-900">Instagram</span>
          <span className="font-['Manrope'] text-[10px] tracking-widest uppercase text-zinc-400 cursor-pointer hover:text-zinc-900">Vimeo</span>
          <span className="font-['Manrope'] text-[10px] tracking-widest uppercase text-zinc-400 cursor-pointer hover:text-zinc-900">Pinterest</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
