import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/product.type";
import AddBtn from "../AddBtn/AddBtn";
import WishlistBtn from "./../WishlistBtn/WishlistBtn";

export default function SingleProduct({ product }: { product: ProductType }) {
  return (
    <div className=" w-full  md:w-1/2 lg:w-1/4 xl:w-1/5">
      <div className="item p-4">
        <Card className="relative gap-2 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 rounded-lg p-2">
          {/* زرار القلب في الركن */}
          <div className="absolute top-2 right-2 z-20 bg-white rounded-full p-1 shadow-md hover:scale-110 transition-transform">
            <WishlistBtn id={product.id} />
          </div>
          <Link href={`/products/${product.id}`}>
            <CardHeader>
              <CardTitle>
                <Image
                  src={product.imageCover}
                  alt=""
                  width={500}
                  height={500}
                  className="rounded-md"
                />
              </CardTitle>
              <CardDescription className="text-green-500">
                {product.category.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="font-semibold">
              <p className="line-clamp-2">{product.title}</p>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full text-gray-600">
                <span>{product.price}EGP</span>
                <span>
                  {product.ratingsAverage}{" "}
                  <i className="fa-solid fa-star text-yellow-400"></i>
                </span>
              </div>
            </CardFooter>
          </Link>
          <AddBtn id={product.id} />
        </Card>
      </div>
    </div>
  );
}
