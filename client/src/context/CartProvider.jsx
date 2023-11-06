import React from "react";
import { createContext, useState, useEffect } from "react";
const cartContext = createContext({});
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  useEffect(() => {
    const Cart = JSON.parse(localStorage.getItem("cart"));
    if (Cart) {
      setCart(Cart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    return () => localStorage.removeItem("cart");
  }, [cart]);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};

export { CartProvider };
export default cartContext;
