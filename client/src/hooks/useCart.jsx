import React from "react";
import { useContext } from "react";
import cartContext from "../context/CartProvider";

const useCart = () => {
  return useContext(cartContext);
};

export default useCart;
