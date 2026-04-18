import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", icon: "dashboard", path: "/" },
  { label: "Products", icon: "inventory_2", path: "/products" },
  { label: "Orders", icon: "shopping_bag", path: "/orders" },
  { label: "Customers", icon: "group", path: "/customers" },
  { label: "Settings", icon: "settings", path: "/settings" },
];

export default function SideNav() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-full w-72 z-50 bg-[#f9f9f9] flex flex-col py-10 px-6 gap-8 border-r  border-gray-200">
      {/* Brand */}
      <div className="flex flex-col gap-1 px-2">
        <h1 className="font-headline font-bold text-xl text-[#1A1A1A]">Maurion Noir</h1>
        <p className="font-body text-[10px] tracking-widest uppercase text-secondary">Admin Portal</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col gap-2 mt-4">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-4 py-3 px-4 font-body text-sm tracking-wide uppercase transition-colors duration-200 ${
                isActive
                  ? "bg-white text-[#5f5e5e] font-semibold border-r-4 border-[#576160]"
                  : "text-[#576160] hover:text-[#1A1A1A]"
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Links */}
      <div className="mt-auto border-t border-outline-variant/10 pt-8 flex flex-col gap-2">
        <a href="#" className="flex items-center gap-4 py-3 px-4 text-secondary hover:text-primary transition-colors font-body text-sm tracking-wide uppercase">
          <span className="material-symbols-outlined">help</span>
          Support
        </a>
        <a href="#" className="flex items-center gap-4 py-3 px-4 text-secondary hover:text-primary transition-colors font-body text-sm tracking-wide uppercase text-red-700">
          <span className="material-symbols-outlined">logout</span>
          Logout
        </a>
      </div>
    </aside>
  );
}