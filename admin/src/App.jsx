import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import getOrders from "../api/Order_api";
import getProducts from "../api/getProducts";
import SideNav from "./components/layout/SideNav";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState(false);
  
  // State to manage the drawer visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const triggerRefresh = () => {
  console.log("triggerRefresh called"); // add this
  setUpdate((prev) => !prev);
};

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };

   
    fetchOrders();
  }, [update]);
  useEffect(() => {
  console.log("useEffect running, update:", update); // add this
  const fetchProducts = async () => {
    const productsData = await getProducts();
    console.log("fetchProducts response:", productsData); // add this
    if (productsData && productsData.data) {
      setProducts(productsData.data);
    }
  };
  fetchProducts();
}, [update]);

  return (
    <BrowserRouter>
      <div className="bg-[#f9f9f9] min-h-screen relative overflow-x-hidden">
        
        {/* Pass the drawer state and setter to SideNav */}
        <SideNav isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

        <main className="ml-0 lg:ml-72 transition-all duration-300 min-h-screen">
          {/* IMPORTANT: Your pages (Dashboard, Orders, Products) 
             inside these Routes likely call <TopBar />. 
             Make sure you pass 'onMenuClick={() => setIsMenuOpen(true)}' 
             to TopBar within those page components!
          */}
          <Routes>
            <Route path="/" element={<Dashboard orders={orders} onMenuOpen={() => setIsMenuOpen(true)} />} />
            <Route
              path="/orders"
              element={
                <Orders 
                  orders={orders} 
                  onStatusUpdate={triggerRefresh} 
                  onMenuOpen={() => setIsMenuOpen(true)} 
                />
              }
            />
            <Route
              path="/products"
              element={
                <Products 
                  products={products} 
                  onRefresh={triggerRefresh} 
                  onMenuOpen={() => setIsMenuOpen(true)} 
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}