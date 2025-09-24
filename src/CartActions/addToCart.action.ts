"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function addToCart(id: string) {
  try{
    const token = await getMyToken();


  if(!token) throw new Error("Please Login to be able added product to cart ");


  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers: {
      token: token, 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

const payload = await response.json();
return payload;
  }catch(err){
    return err
  }
}
