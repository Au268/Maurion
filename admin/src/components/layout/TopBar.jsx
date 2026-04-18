const AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBBqNjBNwspB1rKApD7qrb7em43RF01PDx4Vtw4YF6XfduRwwS6nKZ6sPAC9nCeR-VgPctwhSP5lrwZRLCq5A2NBz-nJLTk4YX09tKFtwYwm7M1dfuYFbfpWMUGjPExw_IkotPdOr8_bQK3Yg6Veb70Q20XLVDDYF3HuWhyETwGx80raWD3IslJibBezBzpuA3OTveYCcC19r8vpvSPRn_gu9Etu5r1PAB0Uj_BVgjgU70ByZFBPfW45G17lZ8f0_PTqoC_YLTt2tCWViKep4";

export default function TopBar({ placeholder = "Search..." }) {
  return (
    <header className="fixed top-0 right-0 left-72 z-40 bg-[#f9f9f9]/70 backdrop-blur-xl flex justify-between items-center px-12 h-24 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
      {/* Search */}
      <div className="flex items-center gap-8 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
          <input
            className="w-full bg-surface-container-low border-none h-12 pl-12 pr-4 rounded-lg  focus:ring-primary/20 text-sm font-body focus:outline-0 focus:decoration-0"
            placeholder={placeholder}
            type="text"
            
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-all">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-all">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <div className="flex items-center gap-3 ml-4">
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface">Alex Maurion</p>
            <p className="text-[10px] text-secondary font-medium">Administrator</p>
          </div>
          <img
            src={AVATAR}
            alt="Admin"
            className="w-10 h-10 rounded-full object-cover border-2 border-surface-container-high"
          />
        </div>
      </div>
    </header>
  );
}