"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({
  children,
}) => {

  const [cart, setCart] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  // FETCH CART
  const fetchCart = async () => {
    try {

      setLoading(true);

      const res = await fetch(
        `/api/cart/get`
      );
      const data = await res.json();
      console.log(data.cart[0])
      setCart(data.cart[0]);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // AUTO FETCH ON LOAD
  useEffect(() => {
    fetchCart();
  }, []);

  // TOTAL ITEMS COUNT
  const cartCount =
    cart?.items?.reduce(
      (acc, item) =>
        acc + item.quantity,
      0
    ) || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
        cartCount,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);