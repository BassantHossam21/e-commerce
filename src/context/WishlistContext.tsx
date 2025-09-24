// WishlistContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import getLoggedUserWishlist from "@/WishlistActions/getUserWishlist.action";

export type WishlistItem = {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  setWishlist: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
  refreshWishlist: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const refreshWishlist = async () => {
    try {
      const response = await getLoggedUserWishlist();
      if (response.status === "success" && Array.isArray(response.data)) {
        setWishlist(response.data as WishlistItem[]);
      }
    } catch (error) {
      console.log("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    refreshWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, refreshWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
