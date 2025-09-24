"use client";
import getLoggedUserCart from "@/CartActions/getUserCart.action";
import { createContext, useEffect, useState, ReactNode } from "react";

// Define type for CartContext
type CartContextType = {
  numberOfCartItems: number;
  setNumberOfCartItems: React.Dispatch<React.SetStateAction<number>>;
};

// Create context with initial value undefined
export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfCartItems, setNumberOfCartItems] = useState<number>(0);

  async function getUserCart() {
    try {
      const response = await getLoggedUserCart();
      if (response.status === "success") {
        let sum = 0;
        response.data.products.forEach((product: { count: number }) => {
          sum += product.count;
        });
        console.log(sum);
        setNumberOfCartItems(sum);
      }
    } catch (error) {
      console.log("not login");
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItems, setNumberOfCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
