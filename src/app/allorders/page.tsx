"use client";

import { useEffect, useState } from "react";
import getUserOrders from "@/CheckoutActions/getUserOrders.action";
import type { Order, OrderCartItem } from "../../types/order.type";
import Image from "next/image";

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function fetchOrders() {
    const response = await getUserOrders();
    setOrders(response);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Orders
      </h1>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No orders found.</p>
        ) : (
          orders.map((order: Order) => (
            <div
              key={order._id}
              className="border border-gray-200 p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Order ID: {order._id}
                </h2>
                <p className="text-green-600 font-semibold">
                  Total:{" "}
                  <span className="text-black">
                    {order.totalOrderPrice} EGP
                  </span>
                </p>
              </div>

              <ul className="space-y-3">
                {order.cartItems.map((item: OrderCartItem) => (
                  <li
                    key={item._id}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={56} 
                      height={56} 
                      className="object-cover rounded-lg border border-gray-200"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-500">{item.price} EGP</p>
                    </div>
                    <p className="text-sm text-gray-400">{item.count} pcs</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
