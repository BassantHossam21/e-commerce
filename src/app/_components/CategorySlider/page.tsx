import getAllCategories from "@/api/AllCategories";
import React from "react";
import CategorySwiper from "../CategorySwiper/page";

export default async function CategorySlider() {
  const data = await getAllCategories();

  return (
    <div>
      <CategorySwiper data={data} />
    </div>
  );
}
