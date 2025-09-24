import React from "react";

import getSelectedProduct from "@/api/SelectedProduct.api";
import DetailsProduct from "@/app/_components/DetailsProduct/page";
import getRelatedProducts from "@/ProductCategoryActions/relatedproducts.action";
import { ProductType } from "@/types/product.type";
import SingleProduct from "@/app/_components/SingleProduct/SingleProduct";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getSelectedProduct(id);

  if (!data) {
    return <h1>No Products Here</h1>;
  }

  //data.category._id ===> category._id ===> currentProduct
  const relatedProducts = await getRelatedProducts(data.category._id);
  console.log(relatedProducts);

  return (
    <>
      <DetailsProduct data={data} />

      <div className="container mx-auto w-[90%] my-12">
        <div className="flex flex-wrap">
          {relatedProducts.data.map((currentProduct: ProductType) => (
            <SingleProduct key={currentProduct._id} product={currentProduct} />
          ))}
        </div>
      </div>
    </>
  );
}
