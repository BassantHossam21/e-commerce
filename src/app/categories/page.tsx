import getAllCategories from "@/api/AllCategories";
import { CategoryType } from "@/types/category.type";
import React from "react";
import Image from "next/image";

export default async function Categories() {
  const data = await getAllCategories();
  console.log(data);
  return (
    <div className="container mx-auto w-[90%] my-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {data.map((currentCategory: CategoryType) => (
          <div
            key={currentCategory._id}
            className="rounded-md border-2 border-gray-100 overflow-hidden 
                      transform transition-transform duration-400 
                      hover:shadow-md  hover:shadow-green-700 hover:scale-101"
          >
            <div className="relative w-full h-48 md:h-64">
              <Image
                src={currentCategory.image}
                alt={currentCategory.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="rounded"
              />
            </div>
            <p className="text-center text-2xl m-4 text-green-700 font-semibold">
              {currentCategory.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
