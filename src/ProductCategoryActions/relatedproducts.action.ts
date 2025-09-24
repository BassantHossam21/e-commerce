"use server"

export default async function getRelatedProducts(categoryId:string){
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,{
    method:"GET",
  });
  const payload=await response.json();
  return payload;
}