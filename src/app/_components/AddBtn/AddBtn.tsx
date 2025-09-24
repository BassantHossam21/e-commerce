"use client";
import addToCart from "@/CartActions/addToCart.action";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function Addbtn({ id }: { id: string }) {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Not Exist");
  }
  const { numberOfCartItems, setNumberOfCartItems } = context;

  async function checkAddProduct(id: string) {
    const response = await addToCart(id);
    console.log(response);
    if (response.status === "success") {
      toast.success("Product Added To Cart Successfully 🗑", {
        position: "top-center",
        duration: 2000,
      });

      setNumberOfCartItems(numberOfCartItems + 1);
    } else {
      toast.error(response.message, {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <>
      <Button
        onClick={() => checkAddProduct(id)}
        variant="default"
        className=" bg-green-600 hover:bg-green-700 text-white font-semibold  rounded-xl   transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer w-full"
      >
        <ShoppingCart className="w-5 h-5" />
        Add To Cart
      </Button>
    </>
  );
}
