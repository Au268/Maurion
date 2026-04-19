import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", icon: "dashboard", path: "/" },
  { label: "Products", icon: "inventory_2", path: "/products" },
  { label: "Orders", icon: "shopping_bag", path: "/orders" },
  // { label: "Customers", icon: "group", path: "/customers" },
  // { label: "Settings", icon: "settings", path: "/settings" },
];

export default function SideNav({ isOpen, setIsOpen }) {
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location, setIsOpen]);

  return (
    <>
      {/* --- Overlay --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-55 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- Sidebar --- */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 z-60 bg-[#f9f9f9] flex flex-col py-10 px-6 gap-8 border-r border-gray-200 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand Section */}
        <div className="flex justify-between items-center px-2">
          <div className="flex flex-col gap-1">
            <h1 className="font-headline font-bold text-xl text-[#1A1A1A]">Maurion Noir</h1>
            <p className="font-body text-[10px] tracking-widest uppercase text-secondary">Admin Portal</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 text-gray-500 hover:text-black">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Primary Nav Links */}
        <nav className="flex-1 flex flex-col gap-2 mt-4 overflow-y-auto pr-2 custom-scrollbar">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-4 py-3 px-4 font-body text-sm tracking-wide uppercase transition-colors duration-200 ${
                  isActive
                    ? "bg-white text-[#1A1A1A] font-semibold border-r-4 border-[#576160] shadow-sm"
                    : "text-[#576160] hover:text-[#1A1A1A] hover:bg-gray-100/50 rounded-md"
                }`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* --- Missing Options (Bottom Section) --- */}
        <div className="mt-auto border-t border-gray-200 pt-6 flex flex-col gap-2">
          {/* <a 
            href="#" 
            className="flex items-center gap-4 py-3 px-4 text-[#576160] hover:text-[#1A1A1A] transition-colors font-body text-sm tracking-wide uppercase"
          >
            <span className="material-symbols-outlined">help</span>
            Support
          </a> */}
          <button 
            className="flex items-center gap-4 py-3 px-4 text-red-700 hover:bg-red-50 transition-colors font-body text-sm tracking-wide uppercase text-left w-full rounded-md"
            onClick={() => console.log("Logging out...")}
          >
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}