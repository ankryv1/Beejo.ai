"use client"
import React, { createContext, useContext, useState } from 'react'

 const CartContext = createContext();
export const CartProvider = ({children}) => {

   
    const [cart, setCart] = useState([]);

    const fetchCart = async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/add`);
       const data = await res.json();
       setCart(data);
      
    }

    const cartCount = cart.length;

  return (
    <div>
        <CartContext.Provider value={{cart, cartCount, fetchCart}} >
          {children}
        </CartContext.Provider >
    </div>
  )
}

export const useCart = ()=> useContext(CartContext);