import React from 'react';
import { Link } from 'react-router-dom';

const ModernWorkspaces = () => {
  return (
    <section className="py-40 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <span className="font-label tracking-[0.3em] text-xs uppercase mb-6 block text-secondary">The Collection</span>
          <h3 className="font-headline text-5xl font-bold tracking-tighter text-zinc-900 uppercase leading-[1.1] mb-8">Modern<br />Workspaces</h3>
          <p className="text-zinc-600 font-body mb-12 max-w-md">
            Elevate your digital canvas. Our minimalist laptop stands are precision-engineered from aerospace-grade aluminum to provide the perfect ergonomic tilt while maintaining an invisible profile.
          </p>
          <Link to="/category/Accessories" className="border border-zinc-900 text-zinc-900 px-10 py-4 font-label uppercase text-xs tracking-widest hover:bg-zinc-900 hover:text-white transition-all inline-block">
            Explore Accessories
          </Link>
        </div>
        <div className="order-1 lg:order-2">
          <div className="aspect-4/5 bg-white shadow-2xl p-12 relative">
            <img className="w-full h-full object-contain" alt="Brushed silver aluminum laptop stand" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ2Xlnc_5-09P9lOxu-RsLXY7jbspMHkdmTZ1m8rrrgi-hfyR07VPV3OSdZ6gdgycWrbqmiavtz8As7MXoLxVCD5gQJkeCBIE9FrF5PVagxFRSNGSIbbJ9ALTKkfFFirKhYmBLCGE-xzcLaxc7k3ORSsqeBiB7JeUcwhsHvdq8rCsm3-Wy-KXta01oe5irl3g4SxJvdGMPqnHTkmKSFkdXS_9fEpkJfY_LwCV9YNHgb1D-BF9LdN5P6OBLtIeiYdf4_EbwANegurRv" />
            <div className="absolute -bottom-8 -right-8 bg-white p-6 shadow-xl hidden md:block">
              <p className="font-headline text-lg font-bold">M-SERIES 01</p>
              <p className="text-zinc-400 text-xs font-label">FROM $149</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernWorkspaces;
