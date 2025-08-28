import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();
export function useCart() { return useContext(CartContext); }

// Safely read from localStorage
function loadCart() {
  try {
    const raw = localStorage.getItem("cart_v1");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => loadCart());

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(cart));
    } catch {
      /* ignore quota / private mode errors */
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const setQuantity = (id, qty) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const { totalItems, totalPrice } = useMemo(() => {
    const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    return { totalItems, totalPrice };
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    setQuantity,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
