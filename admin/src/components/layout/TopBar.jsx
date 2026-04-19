const AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBBqNjBNwspB1rKApD7qrb7em43RF01PDx4Vtw4YF6XfduRwwS6nKZ6sPAC9nCeR-VgPctwhSP5lrwZRLCq5A2NBz-nJLTk4YX09tKFtwYwm7M1dfuYFbfpWMUGjPExw_IkotPdOr8_bQK3Yg6Veb70Q20XLVDDYF3HuWhyETwGx80raWD3IslJibBezBzpuA3OTveYCcC19r8vpvSPRn_gu9Etu5r1PAB0Uj_BVgjgU70ByZFBPfW45G17lZ8f0_PTqoC_YLTt2tCWViKep4";

export default function TopBar({ placeholder = "Search...", onMenuClick }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-72 z-40 bg-[#f9f9f9]/70 backdrop-blur-xl flex items-center h-20 md:h-24 px-4 md:px-8 lg:px-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border-b border-gray-100/50 transition-all duration-300">
      
      {/* 1. Left Side: Menu Button + Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Trigger */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden min-w-11 h-11 flex items-center justify-center bg-white border border-gray-200 rounded-xl shadow-sm active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[#1A1A1A]">menu</span>
        </button>

        {/* Search Bar */}
        <div className="relative w-full max-w-50 sm:max-w-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
            search
          </span>
          <input
            className="w-full bg-white border border-gray-200 h-11 md:h-12 pl-12 pr-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
            placeholder={placeholder}
            type="text"
          />
        </div>
      </div>

      {/* 2. Right Side: Notifications + Settings + Profile */}
      <div className="flex items-center gap-2 md:gap-6">
        
        {/* Notifications - Hidden on very small screens */}
        <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-white border border-transparent hover:border-gray-200 transition-all">
          <span className="material-symbols-outlined text-gray-600">notifications</span>
        </button>
        
        {/* Settings - Hidden on mobile */}
        <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-white border border-transparent hover:border-gray-200 transition-all">
          <span className="material-symbols-outlined text-gray-600">settings</span>
        </button>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 ml-2 md:ml-4">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] md:text-xs font-bold text-[#1A1A1A]">Alex Maurion</p>
            <p className="text-[9px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wider">Administrator</p>
          </div>
          
          {/* Avatar Container */}
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-[#1A1A1A] flex items-center justify-center text-white text-[10px] font-bold">
            {AVATAR ? (
              <img
                src={AVATAR}
                alt="Admin"
                className="w-full h-full object-cover"
                onError={(e) => e.target.style.display = 'none'} // Image fail ho to initials dikhen
              />
            ) : null}
            <span className="absolute">AM</span>
          </div>
        </div>
      </div>
    </header>
  );
}