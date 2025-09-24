"use server";

import { checkoutSchemaType } from "@/schema/checkout.schema";
import getMyToken from "@/utilities/getMyToken";

export default async function cashPayment(cartId:string,formValues:checkoutSchemaType){
  const token=await getMyToken();
  if(!token ){
    throw new Error("First Login ");
  }

const response=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
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