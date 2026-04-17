import React from 'react';
import { Link } from 'react-router-dom';
const CategoryArchive = () => {
  return (
    <section className="py-32 px-8 max-w-480 mx-auto bg-white">
      <div className="mb-20 flex justify-between items-end">
        <div>
          <h3 className="font-headline text-4xl font-bold tracking-tighter text-zinc-900 uppercase">The Archive</h3>
          <p className="text-zinc-400 font-label text-sm mt-2">Explore our core textile categories.</p>
        </div>
        <a className="text-xs font-label uppercase tracking-widest border-b border-zinc-900 pb-1" href="#">View All Categories</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-300 md:h-200">
        {/* Tracksuits (Large Vertical) */}
        <Link to="#" className="md:col-span-1 md:row-span-2 group relative overflow-hidden bg-surface-container-low block">
          <img className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" alt="Tracksuit fabric texture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFzXNbTxuXtcf0O9p5iGQV5pFMYKtvCz6yRHqetxViZ_wQ_wJyW2ZcLLGCrMAbf0NWFpw2rivrnAP8spktApzCShSNVVgYZwUgDxpmHQgZGR-uYCzhz_KdAr9w2G1z9eI2tIJTinTyF748HvcD1Rd85-Z0GLmkdF9lzpmVINmzFpZG782kaMfypyTJdbEvN5cQxEoHd7ceyMWLjfZmv5gZ0g8DYBaagUSo1448tPd5hPWTdkzzlng-KufOQRM5qLY3nthEsI0nB7dd" />
          <div className="absolute inset-0 bg-black/5 flex flex-col justify-end p-8 text-white">
            <span className="font-headline text-2xl font-black uppercase tracking-tighter">Tracksuits</span>
          </div>
        </Link>
        {/* Polo Shirts (Square) */}
        <Link to="#" className="md:col-span-2 group relative overflow-hidden bg-surface-container-low block">
          <img className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" alt="Polo shirt" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC82miHjTb3PF9elf16GBB810mnBUNcKY91ymxUgd6u5lKvH1tPb8OgawxFRnTkZrkROBKUbVW4uywnCyujt1YhTkP62TvMHWzlD1aKdy6s6uR0DROBqu-aAYNpYJGLlUON_RhpxfMGh3W1OkSHoJdncCxOToxif1UvLwSfReKTj5XBOEg-E5AaOSkl8rBrEAfosYj92frI5xO5wLkTGmUzJVeXu79niaFoyOD4ZbWwsf8LuA4DED_j43tUsdlYC1dQFmQWCUFtZ0TL" />
          <div className="absolute inset-0 bg-black/5 flex flex-col justify-end p-8 text-white">
            <span className="font-headline text-2xl font-black uppercase tracking-tighter">Polo Shirts</span>
          </div>
        </Link>
        {/* Perfumes (Small Portrait) */}
        <Link to="#" className="md:col-span-1 group relative overflow-hidden bg-surface-container-low block">
          <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Perfume bottle" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb9j49mtKECMyOxs0g04iIWV6wXuka-SZTo2Z8dcudeEvRX1g5jRTwPBDvMZXQOPaKm3ZFMX5dV9kVJUeHxRxv77I5Hpz4x69HuDCg7n91WifiEvkwvJEQ5wwwr_kMjqJFOaujWjNH7cXoLoYIbF-Gz-k7HN7VDZnY17J56JtklN_wvzc0fcIpqgBJ7lQbJLKOG2_ZY049m4M_H3t9--wFVLo5p_EGEFcXGrQvS0x5scI9jIUMEJ7XYzkpNQE395UT9T7ajMeoePw6" />
          <div className="absolute inset-0 bg-black/5 flex flex-col justify-end p-8 text-white">
            <span className="font-headline text-2xl font-black uppercase tracking-tighter">Unisex Perfumes</span>
          </div>
        </Link>
        {/* Jackets (Horizontal) */}
        <Link to="#" className="md:col-span-2 group relative overflow-hidden bg-surface-container-low block">
          <img className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110" alt="Modern jacket" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCijfHpz6SkGT8SF5V3SfpRo0cAsALJ7tyDKgn2tdTQk9RMhpw3bhroFDKrPoRK2jQdtua-B_tucLVRoKSHYq1WtHoyFgFhFkweu2VHBv7YciLWSusbVarpr22fNFkbMVqLrzq6HMFBK7k73T7opOenvl-00RRssrh1bKVFLf7z8Mvk7nCfw9DJfwzf9J1eqI-pLEzXxrmc8P_KWwMgaMux7KBuFH3ticx7Pxn34TdPsetqvM6ZEPQpP7Q_TlPjeHcoZQXxMf1ffS3S" />
          <div className="absolute inset-0 bg-black/5 flex flex-col justify-end p-8 text-white">
            <span className="font-headline text-2xl font-black uppercase tracking-tighter">Jackets</span>
          </div>
        </Link>
        {/* T-Shirts (Square) */}
        <Link to="#" className="md:col-span-1 group relative overflow-hidden bg-surface-container-low block">
          <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="White t-shirts" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXGkYrRxHXMuyGOQkxfTYmmxsiCD9Iskt1jFqp4mS8EzXzpppRFnHFkC8LXGOinv12VqJe-Gjk0ZX7b0FTmvJBey6zt8MXn3LGnS4IC9_fxDiKY_zdiXodNiCrw7be7i1WfNhzSfH-Mxa8f3YLiT4vWHTgaOYcfkzfm2-J6jrszdYCg3h5Mu5Cq4CDaOsRLFgeh_5ryPgf9l_bt7dAglu5aeXVvMjFPMEc7beueNYilpo-lQCk_zUywint7H2St-dzsEOqgPRFpS-J" />
          <div className="absolute inset-0 bg-black/5 flex flex-col justify-end p-8 text-white">
            <span className="font-headline text-2xl font-black uppercase tracking-tighter">T-Shirts</span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default CategoryArchive;
