"use server";
import getMyToken from "@/utilities/getMyToken";
export default async function updateCartQuantity(id:string,count:string){
    const token=await getMyToken();
    if(!token){
      throw new Error("please first login");
    }

  const response=await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    method:"PUT",
    headers:{
      "Content-type":"application/json",
      token:token,
    },
    body:JSON.stringify({count:count})
  });
  const payload= await response.json();
  return payload;
}