import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Tracksuits',
    path: '/category/tracksuits',
    count: '12 styles',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFzXNbTxuXtcf0O9p5iGQV5pFMYKtvCz6yRHqetxViZ_wQ_wJyW2ZcLLGCrMAbf0NWFpw2rivrnAP8spktApzCShSNVVgYZwUgDxpmHQgZGR-uYCzhz_KdAr9w2G1z9eI2tIJTinTyF748HvcD1Rd85-Z0GLmkdF9lzpmVINmzFpZG782kaMfypyTJdbEvN5cQxEoHd7ceyMWLjfZmv5gZ0g8DYBaagUSo1448tPd5hPWTdkzzlng-KufOQRM5qLY3nthEsI0nB7dd",
    tag: 'New Season',
  },
  {
    name: 'Polo Shirts',
    path: '/category/polo-shirts',
    count: '8 styles',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC82miHjTb3PF9elf16GBB810mnBUNcKY91ymxUgd6u5lKvH1tPb8OgawxFRnTkZrkROBKUbVW4uywnCyujt1YhTkP62TvMHWzlD1aKdy6s6uR0DROBqu-aAYNpYJGLlUON_RhpxfMGh3W1OkSHoJdncCxOToxif1UvLwSfReKTj5XBOEg-E5AaOSkl8rBrEAfosYj92frI5xO5wLkTGmUzJVeXu79niaFoyOD4ZbWwsf8LuA4DED_j43tUsdlYC1dQFmQWCUFtZ0TL",
    tag: 'Bestseller',
  },
  {
    name: 'Jackets',
    path: '/category/jackets',
    count: '6 styles',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCijfHpz6SkGT8SF5V3SfpRo0cAsALJ7tyDKgn2tdTQk9RMhpw3bhroFDKrPoRK2jQdtua-B_tucLVRoKSHYq1WtHoyFgFhFkweu2VHBv7YciLWSusbVarpr22fNFkbMVqLrzq6HMFBK7k73T7opOenvl-00RRssrh1bKVFLf7z8Mvk7nCfw9DJfwzf9J1eqI-pLEzXxrmc8P_KWwMgaMux7KBuFH3ticx7Pxn34TdPsetqvM6ZEPQpP7Q_TlPjeHcoZQXxMf1ffS3S",
    tag: 'New In',
  },
  {
    name: 'T-Shirts',
    path: '/category/t-shirts',
    count: '10 styles',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXGkYrRxHXMuyGOQkxfTYmmxsiCD9Iskt1jFqp4mS8EzXzpppRFnHFkC8LXGOinv12VqJe-Gjk0ZX7b0FTmvJBey6zt8MXn3LGnS4IC9_fxDiKY_zdiXodNiCrw7be7i1WfNhzSfH-Mxa8f3YLiT4vWHTgaOYcfkzfm2-J6jrszdYCg3h5Mu5Cq4CDaOsRLFgeh_5ryPgf9l_bt7dAglu5aeXVvMjFPMEc7beueNYilpo-lQCk_zUywint7H2St-dzsEOqgPRFpS-J",
    tag: null,
  },
  {
    name: 'Perfumes',
    path: '/category/perfumes',
    count: '5 styles',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAb9j49mtKECMyOxs0g04iIWV6wXuka-SZTo2Z8dcudeEvRX1g5jRTwPBDvMZXQOPaKm3ZFMX5dV9kVJUeHxRxv77I5Hpz4x69HuDCg7n91WifiEvkwvJEQ5wwwr_kMjqJFOaujWjNH7cXoLoYIbF-Gz-k7HN7VDZnY17J56JtklN_wvzc0fcIpqgBJ7lQbJLKOG2_ZY049m4M_H3t9--wFVLo5p_EGEFcXGrQvS0x5scI9jIUMEJ7XYzkpNQE395UT9T7ajMeoePw6",
    tag: 'Exclusive',
  },
  {
    name: 'Accessories',
    path: '/category/Accessories',
    count: '14 styles',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ2Xlnc_5-09P9lOxu-RsLXY7jbspMHkdmTZ1m8rrrgi-hfyR07VPV3OSdZ6gdgycWrbqmiavtz8As7MXoLxVCD5gQJkeCBIE9FrF5PVagxFRSNGSIbbJ9ALTKkfFFirKhYmBLCGE-xzcLaxc7k3ORSsqeBiB7JeUcwhsHvdq8rCsm3-Wy-KXta01oe5irl3g4SxJvdGMPqnHTkmKSFkdXS_9fEpkJfY_LwCV9YNHgb1D-BF9LdN5P6OBLtIeiYdf4_EbwANegurRv",
    tag: null,
  },
  {
    name: 'Summer Expedition',
    path: '/category/summer-essentials',
    count: '20 styles',
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEuMRxxouYC7wq2UkHhwAwLhDaSz8axQ2H6n3BnJqSyCQTov8vw-IuptnTRtK4THqheZkUIEQT7ecBo7hws61WDJTNG2Z_82DO2psQ1sdZu_v1Qx-6VJsrJTtvt8X_abg1hgFWCOVGJDsoRy5R53SAdpEOpyN0OWxD7oVTRwNwompGrmOnDma2BxWFr77FBy5Vv4fulNl49Hbb_hqFIn3I8h_wKGkR1qhv95O5V5DuePk_illcMskWXfT3SBCYRw8zSpjs0WYJL9rf",
    tag: 'Limited Edition',
  },
];

const ShopPage = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20.25 min-h-screen bg-white">
      {/* Page Header */}
      <div className="px-6 md:px-12 py-16 md:py-24 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="font-['Epilogue'] text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-zinc-950">
            All<br />Collections
          </h1>
          <p className="font-['Manrope'] text-[10px] tracking-[0.18em] uppercase text-zinc-400 leading-loose max-w-xs">
            Refined utility for the modern wardrobe. Every piece designed with restraint and purpose.
          </p>
        </div>
      </div>

      {/* Category Grid - Fixed Heights for a clean look */}
      <div className="px-6 md:px-12 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              // Fixed aspect ratio 3/4 makes all cards uniform and removes gaps
              className="group relative overflow-hidden bg-zinc-50 block aspect-3/4"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale hover:grayscale-0"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 via-zinc-950/20 to-transparent transition-opacity duration-300" />

              {/* Tag */}
              {cat.tag && (
                <span className="absolute top-4 left-4 bg-white text-zinc-950 font-['Epilogue'] text-[9px] font-black tracking-[0.2em] uppercase px-3 py-1.5 z-20">
                  {cat.tag}
                </span>
              )}

              {/* Bottom Text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-end z-20">
                <div>
                  <p className="font-['Manrope'] text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2">
                    {cat.count}
                  </p>
                  <h2 className="font-['Epilogue'] text-2xl md:text-3xl font-black tracking-tight uppercase text-white leading-none">
                    {cat.name}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors duration-300">
                  <span className="font-['Manrope'] text-[9px] tracking-[0.2em] uppercase font-bold">Shop</span>
                  <span className="material-symbols-outlined text-base translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                    arrow_forward
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;