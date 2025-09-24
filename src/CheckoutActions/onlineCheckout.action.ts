"use server";

import { checkoutSchemaType } from "@/schema/checkout.schema";
import getMyToken from "@/utilities/getMyToken";

export default async function onlinePayment(cartId:string, url = process.env.NEXT_URL,formValues:checkoutSchemaType){
  const token=await getMyToken();
  if(!token ){
    throw new Error("First Login ");
  }

const response=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      token:token,
    },
    body: JSON.stringify({
    shippingAddress:formValues
})

  });

  const  payload=await response.json();
  return payload;

}