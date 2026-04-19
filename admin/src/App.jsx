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

  const triggerRefresh = () => setUpdate((prev) => !prev);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };

    const fetchProducts = async () => {
      const productsData = await getProducts();
      if (productsData && productsData.data) {
        setProducts(productsData.data);
      }
    };

    fetchOrders();
    fetchProducts();
  }, [update]);

  return (
    <BrowserRouter>
      <div className="flex bg-[#f9f9f9] min-h-screen">
        <SideNav />
        <main className="ml-60 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard orders={orders} />} />
            <Route
              path="/orders"
              element={<Orders orders={orders} onStatusUpdate={triggerRefresh} />}
            />
            <Route
              path="/products"
              element={<Products products={products} onRefresh={triggerRefresh} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}