import React from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import getProducts from "@/api/products.api";
import { ProductType } from "@/types/product.type";

export default async function AllProducts() {
   const data = await getProducts(); // data (Array Of Objects[{}])

  return (
    <div className="container mx-auto w-[90%] my-12">
      <div className="flex flex-wrap">
        {data.map((currentProduct:ProductType) => (
          <SingleProduct key={currentProduct._id} product={currentProduct} />
        ))}
      </div>
    </div>
  );
}
