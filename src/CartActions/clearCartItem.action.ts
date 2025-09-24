"use server"

import getMyToken from "@/utilities/getMyToken";

export default async function  clearCart(){
  
    const token = await getMyToken();

    if(!token){
      throw new Error("Please Login First");
    }

      const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
        method:"DELETE",
        headers:{
          token:token,
          "Content-Type":"application/json",

        }
      })

      const payload= await response.json();

      return payload;

}