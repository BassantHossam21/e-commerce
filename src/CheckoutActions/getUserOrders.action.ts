"use server";

import getMyToken from "@/utilities/getMyToken";
import { jwtDecode } from "jwt-decode";


type DecodedToken = {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
};

export default async function getUserOrders() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("Please login first");
  }

  // نفك التوكن ونجيب الـ id
  const decoded: DecodedToken = jwtDecode(token);
  const userId = decoded.id;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    }
  );

  const payload = await response.json();
  return payload;
}
