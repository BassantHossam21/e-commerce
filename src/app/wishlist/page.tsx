// WishlistPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import Addbtn from "./../_components/AddBtn/AddBtn";
import removeWishlistItem from "@/WishlistActions/removeWishlistItem.action";
import { toast } from "sonner";
import { useWishlist, WishlistItem } from "@/context/WishlistContext";
import getLoggedUserWishlist from "@/WishlistActions/getUserWishlist.action";
import Image from "next/image";

export default function Wishlist() {
  const { wishlist, setWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);
  const [removeDisable, setRemoveDisable] = useState(false);

  async function getUserWishlist() {
    try {
      const response = await getLoggedUserWishlist();
      if (response.status === "success" && Array.isArray(response.data)) {
        setWishlist(response.data as WishlistItem[]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function deleteItem(itemId: string) {
    setRemoveDisable(true);
    const response = await removeWishlistItem(itemId);

    if (response.status === "success") {
      toast.success(response.message, {
        position: "top-center",
        duration: 2000,
      });
      setWishlist((prev) => prev.filter((item) => item._id !== itemId));
    } else {
      toast.error("Can't remove this product", {
        position: "top-center",
        duration: 2000,
      });
    }
    setRemoveDisable(false);
  }

  if (loading) {
    return (
      <h1 className="text-center text-3xl font-bold my-12 text-red-600">
        Loading....
      </h1>
    );
  }

  return (
    <>
      {wishlist.length > 0 ? (
        <div className="container w-[90%] lg:w-2/3 mx-auto my-12">
          <div className="shadow-md sm:rounded-lg">
            {/* Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="px-16 py-3">Image</th>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3 text-center">Add to Cart</th>
                    <th className="px-6 py-3 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((item) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="p-6">
                        <Image
                          src={item.imageCover}
                          alt={item.title}
                          width={500}
                          height={500}
                          className="w-16 md:w-32 object-contain"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 max-w-xs">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-green-600 font-semibold">
                        {item.price} EGP
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Addbtn id={item._id} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          disabled={removeDisable}
                          onClick={() => deleteItem(item._id)}
                          className="text-red-500 font-semibold hover:underline cursor-pointer disabled:text-slate-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile + Tablet */}
            <div className="lg:hidden space-y-4">
              {wishlist.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.imageCover}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-contain"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="text-green-600 font-bold">
                        {item.price} EGP
                      </p>
                      <button
                        disabled={removeDisable}
                        onClick={() => deleteItem(item._id)}
                        className="text-red-500 font-semibold mt-1 cursor-pointer disabled:text-slate-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <Addbtn id={item._id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-2xl font-bold my-12 text-red-500">
          No Products Added Yet!
        </p>
      )}
    </>
  );
}
