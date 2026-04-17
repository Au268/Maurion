import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  });

  // Har cart change pe localStorage update karo
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Product add karo — agar already hai to quantity badha do
  const addToCart = (product, quantity, selectedColor, selectedSize) => {
    const item = {
      id:       product._id || product.id,
      title:    product.title,
      price:    product.price,
      image:    product.image || product.imageUrl || '',
      color:    selectedColor,
      size:     selectedSize,
      quantity,
    };

    setCart(prev => {
      const existing = prev.find(
        p => p.id === item.id && p.color === item.color && p.size === item.size
      );
      if (existing) {
        return prev.map(p =>
          p.id === item.id && p.color === item.color && p.size === item.size
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id, color, size) => {
    setCart(prev => prev.filter(
      p => !(p.id === id && p.color === color && p.size === size)
    ));
  };

  const updateQuantity = (id, color, size, delta) => {
    setCart(prev => prev
      .map(p =>
        p.id === id && p.color === color && p.size === size
          ? { ...p, quantity: p.quantity + delta }
          : p
      )
      .filter(p => p.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = cart.reduce((sum, p) => sum + Number(p.price) * p.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);