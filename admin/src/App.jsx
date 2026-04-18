import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideNav from "./components/layout/SideNav";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-[#f9f9f9] min-h-screen">
        <SideNav />
        {/* ml-60 matches the w-60 sidebar */}
        <main className="ml-60 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}