import React from "react";
import { Link } from "react-router-dom";

const SummerExpedition = () => {
  return (
    <section className="py-40 bg-white">
      <div className="max-w-480 mx-auto flex flex-col lg:flex-row gap-0">
        <div className="lg:w-1/2 h-175 relative overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt="Portable fridge placed in a luxury coastal setting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEuMRxxouYC7wq2UkHhwAwLhDaSz8axQ2H6n3BnJqSyCQTov8vw-IuptnTRtK4THqheZkUIEQT7ecBo7hws61WDJTNG2Z_82DO2psQ1sdZu_v1Qx-6VJsrJTtvt8X_abg1hgFWCOVGJDsoRy5R53SAdpEOpyN0OWxD7oVTRwNwompGrmOnDma2BxWFr77FBy5Vv4fulNl49Hbb_hqFIn3I8h_wKGkR1qhv95O5V5DuePk_illcMskWXfT3SBCYRw8zSpjs0WYJL9rf"
          />
        </div>
        <div className="lg:w-1/2 flex items-center justify-center p-12 lg:p-24 bg-surface-container-low">
          <div className="max-w-md">
            <span className="font-label tracking-[0.3em] text-xs uppercase mb-6 block text-tertiary">
              Seasonal Essential
            </span>
            <h3 className="font-headline text-5xl font-bold tracking-tighter text-zinc-900 uppercase leading-[1.1] mb-8">
              Summer
              <br />
              Expedition
            </h3>
            <p className="text-zinc-600 font-body mb-12">
              Luxury without limits. Our high-end portable refrigeration systems
              offer uncompromising cooling performance for the modern nomad.
              Encased in a powder-coated arctic white shell.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-zinc-300"></span>
                <span className="text-xs font-label uppercase tracking-widest text-zinc-500">
                  -20°C Deep Freeze Capacity
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-12 h-px bg-zinc-300"></span>
                <span className="text-xs font-label uppercase tracking-widest text-zinc-500">
                  Dual-Zone Temperature Control
                </span>
              </div>
            </div>
            <Link
              to="/collections"
              className="mt-12 inline-block bg-zinc-900 text-white px-10 py-4 font-label uppercase text-xs tracking-widest hover:opacity-90 transition-all text-center"
            >
              Pre-Order Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummerExpedition;
