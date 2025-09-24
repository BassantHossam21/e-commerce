"use server";

import getMyToken from "@/utilities/getMyToken";

export default async function removeWishlistItem(itemId: string) {

const token = await getMyToken();

if(!token){
  throw new Error("please login first");
}


const response=await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {
method: 'DELETE',
headers:{
  'Content-Type': 'application/json',
  token:token,
}

}

)
const payload =await response.json();
return payload;

};