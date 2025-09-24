"use client";
import getLoggedUserCart from "@/CartActions/getUserCart.action";
import removeCartItem from "@/CartActions/removeCartItem.action";
import updateCartQuantity from "@/CartActions/updateCartQuantity.action";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import clearCart from "@/CartActions/clearCartItem.action";
import { CartContext } from "@/context/CartContext";
import { CartProductType } from "@/types/cart.type";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeDesiable, setRemoveDesiable] = useState(false);
  const [updateDesiable, setUpdateDesiable] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState("");
  // const { numberOfCartItems, setNumberOfCartItems } = useContext(CartContext);
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Not Exist");
  }
  const { numberOfCartItems, setNumberOfCartItems } = context;

  async function getUserCart() {
    try {
      const response = await getLoggedUserCart();
      console.log(response);
      if (response.status === "success") {
        setTotalPrice(response.data.totalCartPrice);
        console.log(response.cartId);
        setCartId(response.cartId); //CartId
        setProducts(response.data.products);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  //دي خاصه بالدفع كاش علشان يفضي الكارت
  useEffect(() => {
    if (numberOfCartItems === 0) setProducts([]);
  }, [numberOfCartItems]);

  if (loading) {
    return (
      <h1 className="text-center text-3xl font-bold my-12 text-red-600">
        Loading....
      </h1>
    );
  }

  //Delete Function
  async function deleteProduct(id: string) {
    setRemoveDesiable(true);
    setUpdateDesiable(true);
    const response = await removeCartItem(id);
    console.log(response);
    if (response.status === "success") {
      setProducts(response.data.products);
      toast.success("Product Removed Successfully", {
        position: "top-center",
        duration: 2000,
      });

      let sum = 0;
      response.data.products.forEach((product: CartProductType) => {
        sum += product.count;
      });
      setNumberOfCartItems(sum);

      getUserCart();
      setRemoveDesiable(false);
      setUpdateDesiable(false);
    } else {
      toast.success("Cant't Delete Product Now!", {
        position: "top-center",
        duration: 2000,
      });
      setRemoveDesiable(false);
      setUpdateDesiable(false);
    }
  }

  //Update Function

  async function updateProduct(id: string, count: string, sign: string) {
    setCurrentId(id);
    setUpdateLoading(true);
    setUpdateDesiable(true);
    setRemoveDesiable(true);
    const response = await updateCartQuantity(id, count);
    console.log(response);
    if (response.status === "success") {
      setProducts(response.data.products);
      toast.success("Quantity Updated Successfuly", {
        position: "top-center",
        duration: 2000,
      });

      if (sign == "+") {
        setNumberOfCartItems(numberOfCartItems + 1);
      } else if (sign == "-") {
        setNumberOfCartItems(numberOfCartItems - 1);
      }
      getUserCart();
      setUpdateLoading(false);
      setUpdateDesiable(false);
      setRemoveDesiable(false);
    } else {
      toast.success("Can't Updated The Quantity", {
        position: "top-center",
        duration: 2000,
      });
      setUpdateLoading(false);
      setUpdateDesiable(false);
      setRemoveDesiable(false);
    }
  }

  //Clear Function
  async function clear() {
    const response = await clearCart();
    console.log(response);
    if (response.message === "success") {
      setProducts([]);
      toast.success("🛒✅ Cart cleared successfully!", {
        position: "top-center",
        duration: 2000,
      });
    } else {
      toast.error("❌ Can't clear cart now!", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
  <>
    {products.length > 0 ? (
      <div className="container w-full sm:w-2/3 mx-auto my-12 px-2 sm:px-0">
        {/* Button Clear */}
        <div className="flex items-center justify-end">
          <Button
            onClick={() => clear()}
            className="my-4 px-4 py-2 rounded-sm font-medium bg-transparent border-2 border-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300 shadow-sm text-base sm:text-lg text-black"
          >
            Clear Cart Item
          </Button>
        </div>

        {/* Total Price */}
        <h1 className="text-center text-xl sm:text-3xl font-bold text-green-600 my-4">
          Total Cart Price : {totalPrice}
        </h1>

        {/* Responsive Table / Cards */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {/* Desktop Table */}
          <table className="hidden sm:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: CartProductType) => (
                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <Image
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                      width={500}
                      height={500}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateProduct(
                            product.product._id,
                            `${product.count - 1}`,
                            "-"
                          )
                        }
                        disabled={updateDesiable}
                        className="inline-flex disabled:bg-slate-900 disabled:text-white items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        {product.product.id === currentId ? (
                          updateLoading ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            <span>{product.count}</span>
                          )
                        ) : (
                          <span>{product.count}</span>
                        )}
                      </div>
                      <button
                        onClick={() =>
                          updateProduct(
                            product.product._id,
                            `${product.count + 1}`,
                            "+"
                          )
                        }
                        disabled={updateDesiable}
                        className="inline-flex disabled:bg-slate-900 disabled:text-white items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price * product.count} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button
                      disabled={removeDesiable}
                      onClick={() => deleteProduct(product.product.id)}
                      className="text-red-500 cursor-pointer font-semibold disabled:text-slate-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile / Tablet Cards - Improved Spacing & Borders */}
          <div className="sm:hidden flex flex-col gap-6">
            {products.map((product: CartProductType) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-md p-5 flex flex-col items-center transition-transform transform hover:scale-105"
              >
                <Image
                  src={product.product.imageCover}
                  alt={product.product.title}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded"
                />
                <h2 className="font-semibold text-gray-900 dark:text-white text-lg mt-2 text-center">
                  {product.product.title}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-center text-base">
                  Price: {product.price * product.count} EGP
                </p>

                <div className="flex items-center justify-center gap-4 mt-3">
                  <button
                    onClick={() =>
                      updateProduct(
                        product.product._id,
                        `${product.count - 1}`,
                        "-"
                      )
                    }
                    disabled={updateDesiable}
                    className="inline-flex disabled:bg-slate-900 disabled:text-white items-center justify-center h-8 w-8 text-lg font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                  >
                    -
                  </button>

                  <div>
                    {product.product.id === currentId ? (
                      updateLoading ? (
                        <i className="fa-solid fa-spinner fa-spin text-lg"></i>
                      ) : (
                        <span className="text-lg">{product.count}</span>
                      )
                    ) : (
                      <span className="text-lg">{product.count}</span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      updateProduct(
                        product.product._id,
                        `${product.count + 1}`,
                        "+"
                      )
                    }
                    disabled={updateDesiable}
                    className="inline-flex disabled:bg-slate-900 disabled:text-white items-center justify-center h-8 w-8 text-lg font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => deleteProduct(product.product.id)}
                  disabled={removeDesiable}
                  className="text-red-500 font-semibold mt-3"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <Link href={`/checkout/${cartId}`}>
          <Button className="bg-green-600 hover:bg-green-700 text-white w-full cursor-pointer my-4 p-3 sm:p-5">
            Checkout Now
          </Button>
        </Link>
      </div>
    ) : (
      <h1 className="text-center text-2xl sm:text-3xl font-bold my-12 text-green-600">
        No Products Added Yet!
      </h1>
    )}
  </>
);

}
