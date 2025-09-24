import React from "react";
import Image from "next/image";
import { ProductType } from "@/types/product.type";
import Addbtn from "./../AddBtn/AddBtn";
import WishlistBtn from "../WishlistBtn/WishlistBtn";

export default function DetailsProduct({ data }: { data: ProductType }) {
  return (
    <div className="container w-full lg:w-[75%] mx-auto px-4 py-12 my-12">
      <div className="flex flex-col lg:flex-row">
        <div className=" left w-full lg:w-1/4">
          <div className="item p-2 sm:p-4">
            <Image
              src={data.imageCover}
              alt={data.title}
              width={400} // العرض اللي انت عايزه
              height={400} // الطول اللي انت عايزه
              className="rounded-lg object-cover w-full h-auto"
              priority
            />
          </div>
        </div>

        <div className="right w-full lg:w-3/4">
          <div className="item p-4">
            <h1 className="text-xl sm:text-2xl font-medium my-2">
              {data.title}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base p-2">
              {data.description}
            </p>
            <p className="my-2 text-green-600">{data.category.name}</p>

            <div className="flex justify-between w-full text-gray-600 my-4 text-sm sm:text-base">
              <span>{data.price} EGP</span>
              <span>
                <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                {data.ratingsAverage}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Addbtn id={data.id} />
              <WishlistBtn id={data.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
