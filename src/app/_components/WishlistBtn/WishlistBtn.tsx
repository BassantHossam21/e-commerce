// WishlistBtn.tsx
"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import addToWishlist from "@/WishlistActions/addToWishlist.action";
import removeWishlistItem from "@/WishlistActions/removeWishlistItem.action";
import { toast } from "sonner";
import { useWishlist, WishlistItem } from "@/context/WishlistContext";

type Props = {
  id: string;
};

export default function WishlistBtn({ id }: Props) {
  const { wishlist, refreshWishlist } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.some((item: WishlistItem) => item._id === id));
  }, [wishlist, id]);

  async function toggleWishlist(productId: string) {
    const currentlyInWishlist = isInWishlist;
    setIsInWishlist(!currentlyInWishlist); // UI update سريع

    if (!currentlyInWishlist) {
      // 🟢 إضافة
      const response = await addToWishlist(productId);
      if (response.status === "success") {
        toast.success("Product added to Wishlist ❤", { position: "top-center", duration: 2000 });
        await refreshWishlist(); // نجيب أحدث بيانات
      } else {
        toast.error(response.message, { position: "top-center", duration: 2000 });
        setIsInWishlist(currentlyInWishlist); // rollback
      }
    } else {
      // 🔴 حذف
      const response = await removeWishlistItem(productId);
      if (response.status === "success") {
        toast.success("Product removed from Wishlist ❤", { position: "top-center", duration: 2000 });
        await refreshWishlist(); // نجيب أحدث بيانات
      } else {
        toast.error("Can't remove this product", { position: "top-center", duration: 2000 });
        setIsInWishlist(currentlyInWishlist); // rollback
      }
    }
  }

  return (
    <button
      onClick={() => toggleWishlist(id)}
      className="p-2 transition-colors duration-300 cursor-pointer"
    >
      <Heart
        size={24}
        className={isInWishlist ? "text-green-600 fill-green-600" : "text-black"}
      />
    </button>
  );
}
