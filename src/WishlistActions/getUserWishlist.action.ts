"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function getLoggedUserWishlist(){
  const token = await getMyToken();
if(!token){
  throw new Error("Please Login First To Be Able To See Your Wishlist")
}
  const  response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist",{
      method:"GET",
      headers:{
        token:token,
        "Content-Type":"application/json"
      }
    });
    const payload = await response.json();
    return payload;

}