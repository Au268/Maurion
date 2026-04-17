import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import Navbar from './components/nav-foo/Navbar';
import Home from './components/Home';
import Category from './components/Category';
import Product from './components/Product';
import Footer from './components/nav-foo/Footer';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import Shipping from './components/Shipping';
import Payment  from './components/Payment';
import TrackOrder from './components/Trackorder';


function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/shipping" element={<Shipping />} />
          <Route path="/checkout/payment"  element={<Payment />} /> 
          <Route path="/track"                  element={<TrackOrder />} />
          <Route path="/track/:trackingNumber"  element={<TrackOrder />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;