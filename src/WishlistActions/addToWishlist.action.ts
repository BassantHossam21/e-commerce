"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function addToWishlist(id: string) {

  try{
    const token = await getMyToken();

  if(!token) throw new Error(" Please login to be able add to wishlist");


  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
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
    console.log(err);
    return err;
  }
}
