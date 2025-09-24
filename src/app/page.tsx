import React from "react";
import MainSlider from "./_components/MainSlider/page";
import CategorySlider from "./_components/CategorySlider/page";
import AllProducts from "./_components/AllProducts/page";


export default async function Home() {
  return (
    <div>
      <MainSlider />
      <CategorySlider />
      <AllProducts/>
    </div>
  );
}
