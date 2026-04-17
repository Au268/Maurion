import React from 'react';

const Testimonials = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-px bg-zinc-100"></div>
      </div>
      <section className="px-8 bg-white overflow-hidden pt-40 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="font-label tracking-[0.5em] text-xs mb-6 block text-zinc-300 uppercase">The Reputation</span>
            <h4 className="font-headline text-4xl font-bold tracking-tighter text-zinc-900 uppercase">What Our Customers Say</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex gap-1 text-zinc-900">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
              </div>
              <p className="font-body text-zinc-600 leading-relaxed italic">"The attention to detail in the stitching of the tracksuits is unlike anything I've seen in the luxury market. It's truly an artifact of utility."</p>
              <div>
                <p className="font-headline text-xs font-bold uppercase tracking-widest text-zinc-900">Julian V.</p>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-1">Creative Director, London</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-1 text-zinc-900">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
              </div>
              <p className="font-body text-zinc-600 leading-relaxed italic">"The M-Series laptop stand transformed my workspace. Minimalist, heavy, and perfectly angled. It feels like it was carved from a single block of steel."</p>
              <div>
                <p className="font-headline text-xs font-bold uppercase tracking-widest text-zinc-900">Elena S.</p>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-1">Architect, Berlin</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-1 text-zinc-900">
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
                <span className="material-symbols-outlined text-sm">star</span>
              </div>
              <p className="font-body text-zinc-600 leading-relaxed italic">"Maurion represents the peak of restraint. Their perfumes are subtle yet commanding. It's the only brand that aligns with my personal philosophy."</p>
              <div>
                <p className="font-headline text-xs font-bold uppercase tracking-widest text-zinc-900">Marcus T.</p>
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-1">Product Designer, Tokyo</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
