"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { checkoutSchema, checkoutSchemaType } from "@/schema/checkout.schema";
import onlinePayment from "@/CheckoutActions/onlineCheckout.action";
import { toast } from "sonner";
import cashPayment from "@/CheckoutActions/cashCheckout.action";
import { CartContext } from "@/context/CartContext";

export default function Checkout() {
  //ده خاص بال contextCart علشان الدفع كاش
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartContextProvider");
  }
  const { setNumberOfCartItems } = cartContext;

  //المستخدم يختار طريقه الدفع
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "">("");

  const { id }: { id: string } = useParams();

  const router = useRouter();

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  async function handleCheckout(values: checkoutSchemaType) {
    console.log(values);
    if (!paymentMethod) {
      toast.error("Please select a payment method!", {
        position: "top-center",
        duration: 4000,
      });
      return;
    }
    if (paymentMethod === "card") {
      const response = await onlinePayment(
        id,
        "",
        values
      );
      console.log(response);
      if (response.status === "success") {
        window.location.href = response.session.url;
      }
    } else if (paymentMethod === "cash") {
      const response = await cashPayment(id, values);
      console.log(response);
      toast.success("Order placed successfully with Cash Payment!");
      router.push("/allorders");
      // بعد الدفع، نفرغ الكارت
      setNumberOfCartItems(0); // يحدث الـ Navbar
    }
  }

  return (
    <>
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto my-12 px-4">
        <h1 className="text-2xl md:text-3xl my-4 font-medium text-center md:text-left">
          Checkout Now :
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCheckout)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone:</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* اختيار طرق الدفع */}
            <div className="my-2">
              <div className="flex justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="h-4 w-4 accent-green-600"
                  />
                  <span className="font-medium">Card</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                    className="h-4 w-4 accent-green-600"
                  />
                  <span className="font-medium">Cash</span>
                </label>
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-6">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md w-full">
                Pay Now
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
